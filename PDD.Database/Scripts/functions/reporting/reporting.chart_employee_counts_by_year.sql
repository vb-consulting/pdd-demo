CREATE OR REPLACE FUNCTION reporting.chart_employee_counts_by_year(_limit integer DEFAULT 5) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
    _start bigint;
    _years text[];
begin
    _start := (select max(extract(year from employment_started_at)) from employee_records);
    _years := (select array_agg(year order by year desc) from generate_series(_start, _start - 10, -1) year);
  
    return (
        
        select
            json_build_object(
                'labels', coalesce(_years, array[]::text[]),
                'series', coalesce(
                    array_agg(
                        json_build_object(
                            'data', data,
                            'label', label
                        )
                    ),
                    array[]::json[]
                )
            )
        from (
            
            select
                array_agg(count.value order by year desc) as data,
                c.name as label
            from
                unnest(_years) year
                cross join (
                    select c.id, c.name
                    from 
                        companies c
                        inner join employee_records er on c.id = er.company_id and er.employment_ended_at is null
                    group by 
                        c.id, c.name
                    order by 
                        count(*) desc, c.name
                    limit coalesce(_limit, 5)
                ) c
                join lateral (
                    select count(*) as value
                    from employee_records
                    where 
                        company_id = c.id 
                        and extract(year from employment_started_at) <= year::numeric
                        and (extract(year from employment_ended_at) > year::numeric or employment_ended_at is null)
                ) count on true
            group by
                c.name
        ) sub
        
    );
end
$$;

COMMENT ON FUNCTION reporting.chart_employee_counts_by_year(_limit integer) IS 'Top 5 companies by number of employees for the last ten years.
JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name.
- Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
';
