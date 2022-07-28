DROP FUNCTION IF EXISTS reporting.chart_top_10_comapnies_by_employees();

CREATE OR REPLACE FUNCTION reporting.chart_top_10_comapnies_by_employees() RETURNS json
    LANGUAGE sql
    AS $$
select 
    json_build_object(
        'labels', json_agg(t.name),
        'series', array[
            json_build_object('data', json_agg(t.count))
        ]
    )
from (
    select c.name, count(*)
    from 
        companies c
        inner join employee_records er on c.id = er.company_id and er.employment_ended_at is null
    group by 
        c.id, c.name
    order by 
        count(*) desc, c.name
    limit 10
) t
$$;

COMMENT ON FUNCTION reporting.chart_top_10_comapnies_by_employees() IS 'Top 10 comapnies by number of current employees.
Json object where lables are companies name and it onyl have one series with the number of current employees for each company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
