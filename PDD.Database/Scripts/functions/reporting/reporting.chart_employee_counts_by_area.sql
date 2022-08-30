CREATE OR REPLACE FUNCTION reporting.chart_employee_counts_by_area(_limit integer DEFAULT 3) RETURNS json
    LANGUAGE sql
    AS $$
with companies_cte as (
    
    select c.id, c.name, row_number () over (order by count(*) desc, c.name)
    from 
        companies c
        inner join employee_records er on c.id = er.company_id and er.employment_ended_at is null
    group by 
        c.id, c.name
    order by 
        count(*) desc, c.name
    limit coalesce(_limit, 3)
    
), curr_employees_cte as (
    select a.company_id, a.person_id, b.name, b.row_number
    from employee_records a inner join companies_cte b on a.company_id = b.id
    where a.employment_ended_at is null
), agg1_cte as (
    
    select
        a.name,
        a.row_number,
        c.name as role,
        count(*)
    from 
        curr_employees_cte a
        inner join person_roles b on a.person_id = b.person_id
        inner join business_roles c on b.role_id = c.id
    group by
        a.name,
        c.name,
        a.row_number
),
agg2_cte as (
    select 
        array_agg(count order by role) as data,
        name,
        row_number
    from 
        agg1_cte
    group by 
        name, row_number
)
select 
    json_build_object(
        'labels', (select array_agg(distinct role order by role) from agg1_cte),
        'series', array_agg(
            json_build_object(
                'data', data,
                'label', name
            ) order by row_number
        )
    )
from 
    agg2_cte
$$;

COMMENT ON FUNCTION reporting.chart_employee_counts_by_area(_limit integer) IS 'Business areas, the number of employees for top 3 companies by highest number of employees.
Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
';
