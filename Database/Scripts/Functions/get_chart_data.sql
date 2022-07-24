DROP FUNCTION IF EXISTS public.get_chart_data(_type smallint);

CREATE OR REPLACE FUNCTION public.get_chart_data(_type smallint) RETURNS json
    LANGUAGE plpgsql
    AS $$
begin
if _type = 1 then
    -- top 10 companies with highest number of current employees
    return (
        select 
            json_agg(t) 
        from (
            select 
                c.name as label,
                count(*) as value
            from 
                companies c
                inner join employee_records er on c.id = er.company_id and er.employment_ended_at is null
            group by
                c.name
            order by 
                count(*) desc, c.name
            limit 
                10
        ) t
    );
else
    raise exception 'invalid chart type %', _type;
end if;
end
$$;

COMMENT ON FUNCTION public.get_chart_data(_type smallint) IS 'Returns json with chart data for specified chart type:
- type 1: 
    Top 10 companies with highest number of current employees.
    Label is company name and value is number of current employees.
';
