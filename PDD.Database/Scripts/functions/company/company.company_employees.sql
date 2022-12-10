CREATE OR REPLACE FUNCTION company.company_employees(
    _id uuid
)
RETURNS json
LANGUAGE sql
AS $$
select coalesce(json_agg(sub), '[]'::json)
from ( 
    select 
        a.person_id as personid,
        b.first_name as firstName,
        b.last_name  as lastName,
        date_part('y', now()) - date_part('y', employment_started_at)  as years,
        date_part('y', now()) - date_part('y', b.birth) as age,
        b.country as countryCode,
        d.iso2 as countryIso2,
        d.name as country,
        array_agg(distinct f.name) as roles,
        array_agg(distinct g.name) as types
    from 
        employee_records a
        inner join people b on a.person_id = b.id
        inner join employee_status c on b.employee_status = c.id 
        inner join countries d on b.country = d.code
        inner join person_roles e on b.id = e.person_id
        inner join business_roles f on e.role_id = f.id
        inner join business_role_types g on f.type = g.id
    where 
        company_id = _id
        and employment_started_at < now()
        and b.employee_status = 1
        and (employment_ended_at is null or employment_ended_at > now())
    group by
        a.person_id,
        b.first_name,
        b.last_name,
        employment_started_at,
        b.birth,
        b.country,
        d.iso2,
        d.name
    order by 
        b.last_name, b.first_name
) sub  
$$;
