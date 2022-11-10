CREATE OR REPLACE FUNCTION dashboard.top_experinced_people(_limit integer) RETURNS TABLE(
    id uuid,
    first_name character varying,
    last_name character varying,
    age integer,
    country character varying,
    country_code character varying,
    years_of_experience integer,
    number_of_companies bigint,
    employee_status character varying,
    roles character varying[]
)
LANGUAGE sql
AS $$
select
    p.id,
    p.first_name,
    p.last_name,
    date_part('year', now()) - date_part('year', p.birth) as age,
    country.name as country,
    country.iso2 as country_code,
    years_of_experience,
    number_of_companies,
    es.name as employee_status,
    array_agg(br.name) filter (where br.name is not null) as roles
from
    people p
    join lateral (
        select 
            sum(date_part('year', coalesce(employment_ended_at, now())) - date_part('year', employment_started_at))::int years_of_experience,
            count(er.company_id) number_of_companies
        from 
            employee_records er
        where er.person_id = p.id
    ) er on true
    left outer join employee_status es on p.employee_status = es.id
    left outer join person_roles pr on pr.person_id = p.id
    left outer join business_roles br on br.id = pr.role_id
    left outer join countries country on p.country = country.code
where
    lower(es.name) in ('open to opportunity', 'actively applying', 'employed', 'unemployed')
group by
    p.id,
    country.name,
    country.iso2,
    years_of_experience,
    number_of_companies,
    es.name
order by
    years_of_experience desc nulls last, 
    last_name, 
    first_name
limit _limit
$$;

COMMENT ON FUNCTION dashboard.top_experinced_people(_limit integer) IS 'Top experienced people by the years of the working experience.';
