CREATE OR REPLACE FUNCTION dashboard.chart_employee_counts_by_area(_limit integer) RETURNS json
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
    
), roles_cte as (
    
    select br.id, br.name
    from business_roles br 
    inner join person_roles pr on br.id = pr.role_id 
    inner join curr_employees_cte a on pr.person_id = a.person_id
    group by br.id, br.name
    order by br.name
    
), agg1_cte as (
    
    select
        c.name,
        c.row_number,
        r.name as role,
        (select count(*) from curr_employees_cte e inner join person_roles pr 
         on e.company_id = c.id and  e.person_id = pr.person_id and pr.role_id = r.id  )
    from 
       roles_cte r
       cross join companies_cte c
    
), agg2_cte as (
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
        'labels', coalesce(
            (select array_agg(distinct role order by role) from agg1_cte), 
            array[]::text[]
        ),
        'series', coalesce(
            array_agg(
                json_build_object(
                    'data', data,
                    'label', name
                ) order by row_number
            ),
            array[]::json[]
        )
    )
from 
    agg2_cte
$$;

COMMENT ON FUNCTION dashboard.chart_employee_counts_by_area(_limit integer) IS 'Business areas, the number of employees for top 3 companies by highest number of employees.
JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
';
