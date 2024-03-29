DO $pdd_schema$
BEGIN
--
-- PostgreSQL database dump
--
-- Dumped from database version 15.0 (Ubuntu 15.0-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.0
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
PERFORM pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
ALTER TABLE IF EXISTS ONLY public.business_roles DROP CONSTRAINT IF EXISTS fk_type;
ALTER TABLE IF EXISTS ONLY public.person_roles DROP CONSTRAINT IF EXISTS fk_role_id;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS fk_person_id;
ALTER TABLE IF EXISTS ONLY public.person_roles DROP CONSTRAINT IF EXISTS fk_person_id;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS fk_person_id;
ALTER TABLE IF EXISTS ONLY public.company_reviews DROP CONSTRAINT IF EXISTS fk_person_id;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_modified_by;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS fk_modified_by;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_employee_status;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.company_reviews DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.person_roles DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_country;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS fk_country;
ALTER TABLE IF EXISTS ONLY public.company_reviews DROP CONSTRAINT IF EXISTS fk_company_id;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS fk_company_id;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS fk_company_id;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS fk_area_id;
DROP INDEX IF EXISTS public.idx_users_email;
DROP INDEX IF EXISTS public.idx_person_roles_role_id;
DROP INDEX IF EXISTS public.idx_person_roles_person_id;
DROP INDEX IF EXISTS public.idx_people_gender;
DROP INDEX IF EXISTS public.idx_people_employee_status;
DROP INDEX IF EXISTS public.idx_employee_records_person_id;
DROP INDEX IF EXISTS public.idx_countries_iso3;
DROP INDEX IF EXISTS public.idx_countries_iso2;
DROP INDEX IF EXISTS public.idx_company_reviews_company_id;
DROP INDEX IF EXISTS public.idx_company_areas_company_id;
DROP INDEX IF EXISTS public.idx_companies_country;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.person_roles DROP CONSTRAINT IF EXISTS person_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS people_pkey;
ALTER TABLE IF EXISTS ONLY public.employee_status DROP CONSTRAINT IF EXISTS employee_status_pkey;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS employee_records_pkey;
ALTER TABLE IF EXISTS ONLY public.countries DROP CONSTRAINT IF EXISTS countries_pkey;
ALTER TABLE IF EXISTS ONLY public.company_reviews DROP CONSTRAINT IF EXISTS company_reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS company_areas_pkey;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS companies_pkey;
ALTER TABLE IF EXISTS ONLY public.business_roles DROP CONSTRAINT IF EXISTS business_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.business_role_types DROP CONSTRAINT IF EXISTS business_role_types_pkey;
ALTER TABLE IF EXISTS ONLY public.business_areas DROP CONSTRAINT IF EXISTS business_areas_pkey;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.person_roles;
DROP TABLE IF EXISTS public.people;
DROP TABLE IF EXISTS public.employee_status;
DROP TABLE IF EXISTS public.employee_records;
DROP TABLE IF EXISTS public.countries;
DROP TABLE IF EXISTS public.company_reviews;
DROP TABLE IF EXISTS public.company_areas;
DROP TABLE IF EXISTS public.companies;
DROP TABLE IF EXISTS public.business_roles;
DROP TABLE IF EXISTS public.business_role_types;
DROP TABLE IF EXISTS public.business_areas;
DROP FUNCTION IF EXISTS dashboard.top_rated_companies(_limit integer);
DROP FUNCTION IF EXISTS dashboard.top_experinced_people(_limit integer);
DROP FUNCTION IF EXISTS dashboard.chart_employee_counts_by_year(_limit integer);
DROP FUNCTION IF EXISTS dashboard.chart_employee_counts_by_area(_limit integer);
DROP FUNCTION IF EXISTS dashboard.chart_companies_by_country(_limit integer);
DROP FUNCTION IF EXISTS company.company_reviews(_id uuid, _skip integer, _take integer);
DROP FUNCTION IF EXISTS company.company_employees(_id uuid);
DROP FUNCTION IF EXISTS company.company_details(_id uuid);
DROP FUNCTION IF EXISTS companies.search_countries(_search character varying, _skip integer, _take integer);
DROP FUNCTION IF EXISTS companies.search_companies(_search character varying, _countries smallint[], _areas smallint[], _sort_asc boolean, _skip integer, _take integer);
DROP FUNCTION IF EXISTS companies.business_areas();
DROP TYPE IF EXISTS public.valid_genders;
DROP EXTENSION IF EXISTS pg_trgm;
DROP SCHEMA IF EXISTS dashboard;
DROP SCHEMA IF EXISTS company;
DROP SCHEMA IF EXISTS companies;
--
-- Name: companies; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA companies;
--
-- Name: company; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA company;
--
-- Name: dashboard; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA dashboard;
--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;
--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--
COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';
--
-- Name: valid_genders; Type: TYPE; Schema: public; Owner: -
--
CREATE TYPE public.valid_genders AS ENUM (
    'M',
    'F'
);
--
-- Name: TYPE valid_genders; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TYPE public.valid_genders IS 'There are only two genders.';
--
-- Name: business_areas(); Type: FUNCTION; Schema: companies; Owner: -
--
CREATE FUNCTION companies.business_areas() RETURNS TABLE(value smallint, name character varying)
    LANGUAGE sql
    AS $$
select id as value, name from business_areas;
$$;
--
-- Name: FUNCTION business_areas(); Type: COMMENT; Schema: companies; Owner: -
--
COMMENT ON FUNCTION companies.business_areas() IS 'select value and name from business_areas';
--
-- Name: search_companies(character varying, smallint[], smallint[], boolean, integer, integer); Type: FUNCTION; Schema: companies; Owner: -
--
CREATE FUNCTION companies.search_companies(_search character varying, _countries smallint[], _areas smallint[], _sort_asc boolean, _skip integer, _take integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
    _count bigint;
    _companies uuid[];
begin    
    _search = trim(_search);
    
    if _search = '' then
        _search = null;
    end if;
    
    if _search is not null then
        _search = '%' || _search || '%';
    end if;
    
    if array_length(_areas, 1) is not null then
        _companies = (select distinct array_agg(company_id) from company_areas where area_id = any(_areas));
    end if;
    
    create temp table _tmp on commit drop as
    select 
        c.id
    from 
        companies c
    where (
        (_search is null or name ilike _search or company_line ilike _search)
        and
        (array_length(_countries, 1) is null or country = any(_countries))
        and
        (array_length(_companies, 1) is null or id = any(_companies))
    );
    get diagnostics _count = row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select json_agg(sub)
            from ( 
                select 
                    cm.id, 
                    cm.name, 
                    company_line as companyLine, 
                    about,
                    cn.code as countryCode,
                    cn.iso2 as countryIso2,
                    cn.name as country,
                    cm.web,
                    cm.twitter,
                    cm.linkedin,
                    coalesce(array_agg(json_build_object('id', ba.id, 'name', ba.name)) filter (where ba.name is not null), array[]::json[]) as areas,
                    reviews.count as reviews,
                    reviews.score
                from 
                    _tmp tmp
                    inner join companies cm on tmp.id = cm.id
                    inner join countries cn on cm.country = cn.code
                    left outer join company_areas ca on cm.id = ca.company_id
                    left outer join business_areas ba on ca.area_id = ba.id
                    join lateral (
                        select 
                            count(id), 
                            avg(score) filter (where score is not null)::numeric(3,2) as score
                        from public.company_reviews
                        where company_id = cm.id
                    ) reviews on true
                group by
                    cm.id, cn.code, reviews.count, reviews.score
                order by 
                    case when _sort_asc is true then cm.name end asc,
                    case when _sort_asc is false then cm.name end desc
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;
--
-- Name: FUNCTION search_companies(_search character varying, _countries smallint[], _areas smallint[], _sort_asc boolean, _skip integer, _take integer); Type: COMMENT; Schema: companies; Owner: -
--
COMMENT ON FUNCTION companies.search_companies(_search character varying, _countries smallint[], _areas smallint[], _sort_asc boolean, _skip integer, _take integer) IS 'Search companies by search string (name or company line), or by countries or areas selection.
Result is pageable JSON response `{count, data: [...]}`';
--
-- Name: search_countries(character varying, integer, integer); Type: FUNCTION; Schema: companies; Owner: -
--
CREATE FUNCTION companies.search_countries(_search character varying, _skip integer, _take integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
    _count bigint;
    _row_count bigint;
begin    
    _search = trim(_search);
    
    if _search = '' then
        _search = null;
    end if;
    
    if _search is not null then
        _search = '%' || _search || '%';
    end if;
    
    create temp table _tmp on commit drop as
    select 
        a.code
    from
        countries a
        inner join companies b on a.code = b.country
    where (
        _search is null 
        or a.name ilike _search
        or a.iso2 ilike _search
        or a.iso3 ilike _search
    )
    group by 
        a.code
    order by 
        a.name;
        
    get diagnostics _count = row_count;
    
    insert into _tmp values (null);
    
    insert into _tmp
    select 
        a.code
    from
        countries a
        left outer join companies b on a.code = b.country
    where
        b.id is null
        and (
            _search is null 
            or a.name ilike _search
            or a.iso2 ilike _search
            or a.iso3 ilike _search
        )
    order by a.name;
    
    get diagnostics _row_count = row_count;
    _count = _count + _row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select json_agg(sub)
            from ( 
                select 
                    c.code as value, 
                    c.name,
                    c.iso2,
                    c.iso3
                from 
                    _tmp tmp
                    left outer join countries c on tmp.code = c.code
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;
--
-- Name: FUNCTION search_countries(_search character varying, _skip integer, _take integer); Type: COMMENT; Schema: companies; Owner: -
--
COMMENT ON FUNCTION companies.search_countries(_search character varying, _skip integer, _take integer) IS 'Search countries by name or iso2 or iso3.
Result is pageable JSON response `{count, data: [...]}`
Data record has value and name suitable for select type controls.
Countries with companies are sorted first by name, followed by null record (separator) and then by countries without companies sorted by name.';
--
-- Name: company_details(uuid); Type: FUNCTION; Schema: company; Owner: -
--
CREATE FUNCTION company.company_details(_id uuid) RETURNS json
    LANGUAGE sql
    AS $$
select row_to_json(row)
from (
    select
        a.id,
        a.name,
        a.web,
        a.linkedin,
        a.twitter,
        a.company_line as companyLine,
        a.about,
        a.country as countryCode,
        b.iso2 as countryIso2,
        b.name as country,
        coalesce(array_agg(json_build_object('id', f.id, 'name',f.name)) filter (where f.name is not null), array[]::json[]) as areas,
        a.created_at as createdAt,
        c.name as createdBy,
        a.modified_at as modifiedAt,
        d.name as modifiedBy
    from
        companies a
        inner join countries b on a.country = b.code
        inner join users c on a.created_by = c.id
        inner join users d on a.modified_by = d.id
        left outer join company_areas e on a.id = e.company_id
        left outer join business_areas f on e.area_id = f.id
    where
        a.id = _id
    group by
        a.id, b.iso2, b.name, c.name, d.name
) row
$$;
--
-- Name: company_employees(uuid); Type: FUNCTION; Schema: company; Owner: -
--
CREATE FUNCTION company.company_employees(_id uuid) RETURNS json
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
--
-- Name: company_reviews(uuid, integer, integer); Type: FUNCTION; Schema: company; Owner: -
--
CREATE FUNCTION company.company_reviews(_id uuid, _skip integer, _take integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
    _count bigint;
begin
    create temp table _tmp on commit drop as
    select 
        c.id
    from 
        company_reviews c
    where (
        company_id = _id
    );
    get diagnostics _count = row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select coalesce(json_agg(sub), '[]'::json)
            from ( 
                 select 
                    a.person_id as personId,
                    b.first_name as firstName,
                    b.last_name  as lastName,
                    a.review,
                    a.score,
                    a.modified_at as at
                from 
                    company_reviews a
                    inner join people b on a.person_id = b.id
                where 
                    company_id = _id
                order by 
                    a.modified_at desc
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;
--
-- Name: chart_companies_by_country(integer); Type: FUNCTION; Schema: dashboard; Owner: -
--
CREATE FUNCTION dashboard.chart_companies_by_country(_limit integer) RETURNS json
    LANGUAGE sql
    AS $$
with cte as (
    select 
        b.name, count(*), row_number () over (order by count(*) desc, b.name)
    from
        companies a
        inner join countries b on a.country = b.code
    group by 
        b.name
    order by
        count(*) desc, b.name
)
select
    json_build_object(
        'labels', json_agg(sub.name),
        'series', array[
            json_build_object('data', json_agg(coalesce(sub.count, 0)))
        ]
    )
from (
    select name, count, row_number 
    from cte 
    where row_number < coalesce(_limit, 10)
    union all
    select 'Other' as name, sum(count) as count, 10 as row_number 
    from cte 
    where row_number >= coalesce(_limit, 10)
    order by row_number
) sub
$$;
--
-- Name: FUNCTION chart_companies_by_country(_limit integer); Type: COMMENT; Schema: dashboard; Owner: -
--
COMMENT ON FUNCTION dashboard.chart_companies_by_country(_limit integer) IS 'Number of companies by country.
JSON object where labels are country names and it only have one series with the number of companies for each country.
It show only first 9 countries and 10th is summed together as other. 
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
--
-- Name: chart_employee_counts_by_area(integer); Type: FUNCTION; Schema: dashboard; Owner: -
--
CREATE FUNCTION dashboard.chart_employee_counts_by_area(_limit integer) RETURNS json
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
--
-- Name: FUNCTION chart_employee_counts_by_area(_limit integer); Type: COMMENT; Schema: dashboard; Owner: -
--
COMMENT ON FUNCTION dashboard.chart_employee_counts_by_area(_limit integer) IS 'Business areas, the number of employees for top 3 companies by highest number of employees.
JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
';
--
-- Name: chart_employee_counts_by_year(integer); Type: FUNCTION; Schema: dashboard; Owner: -
--
CREATE FUNCTION dashboard.chart_employee_counts_by_year(_limit integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
    _start bigint;
    _years text[];
begin
    _start := (select max(extract(year from employment_started_at)) from employee_records);
    _years := (select array_agg(year order by year desc) from generate_series(_start, _start - 9, -1) year);
  
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
                        and extract(year from employment_started_at) = year::numeric
                        and (extract(year from employment_ended_at) >= year::numeric or employment_ended_at is null)
                ) count on true
            group by
                c.name
        ) sub
        
    );
end
$$;
--
-- Name: FUNCTION chart_employee_counts_by_year(_limit integer); Type: COMMENT; Schema: dashboard; Owner: -
--
COMMENT ON FUNCTION dashboard.chart_employee_counts_by_year(_limit integer) IS 'Top companies by number of employees for the last ten years.
JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name.
- Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
';
--
-- Name: top_experinced_people(integer); Type: FUNCTION; Schema: dashboard; Owner: -
--
CREATE FUNCTION dashboard.top_experinced_people(_limit integer) RETURNS TABLE(id uuid, first_name character varying, last_name character varying, age integer, country character varying, countrycode smallint, countryiso2 character varying, years_of_experience integer, number_of_companies bigint, employee_status character varying, roles character varying[])
    LANGUAGE sql
    AS $$
select
    p.id,
    p.first_name,
    p.last_name,
    date_part('year', now()) - date_part('year', p.birth) as age,
    country.name as country,
    country.code as countrycode,
    country.iso2 as countryiso2,
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
    country.code,
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
--
-- Name: FUNCTION top_experinced_people(_limit integer); Type: COMMENT; Schema: dashboard; Owner: -
--
COMMENT ON FUNCTION dashboard.top_experinced_people(_limit integer) IS 'Top experienced people by the years of the working experience.';
--
-- Name: top_rated_companies(integer); Type: FUNCTION; Schema: dashboard; Owner: -
--
CREATE FUNCTION dashboard.top_rated_companies(_limit integer) RETURNS json
    LANGUAGE sql
    AS $$
select json_agg(sub)
from (
    select
        comp.id,
        comp.name,
        company_line as "companyLine",
        country.name as "country",
        country.code as "countrycode",
        country.iso2 as "countryiso2",
        (
            select array_agg(json_build_object('id', id, 'name', name))
            from (
                select 
                    ba.id, ba.name
                from company_areas ca
                inner join business_areas ba on ca.area_id = ba.id
                where 
                    ca.company_id = comp.id
                group by
                    ba.id, ba.name
            ) sub
        ) as areas,
        avg(rev.score) filter (where rev.score is not null)::numeric(3,2) as score,
        count(rev.id) as reviews
    from 
        companies comp 
        inner join countries country on comp.country = country.code
        left outer join company_reviews rev on comp.id = rev.company_id
    group by
        comp.id,
        comp.name,
        company_line,
        country.name,
        country.code,
        country.iso2
    order by
        avg(rev.score) desc nulls last,
        comp.created_at desc,
        comp.name
    limit _limit
) sub
$$;
--
-- Name: FUNCTION top_rated_companies(_limit integer); Type: COMMENT; Schema: dashboard; Owner: -
--
COMMENT ON FUNCTION dashboard.top_rated_companies(_limit integer) IS 'Top rated companies by the user score.';
SET default_tablespace = '';
SET default_table_access_method = heap;
--
-- Name: business_areas; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.business_areas (
    id smallint NOT NULL,
    name character varying NOT NULL
);
--
-- Name: TABLE business_areas; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.business_areas IS 'Business areas that companies may be involved.';
--
-- Name: business_areas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.business_areas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.business_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: business_role_types; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.business_role_types (
    id smallint NOT NULL,
    name character varying NOT NULL
);
--
-- Name: TABLE business_role_types; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.business_role_types IS 'Types or groups of business roles.';
--
-- Name: business_role_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.business_role_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.business_role_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: business_roles; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.business_roles (
    id smallint NOT NULL,
    name character varying NOT NULL,
    type smallint NOT NULL
);
--
-- Name: TABLE business_roles; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.business_roles IS 'Roles in a team that employees are specialized working with.';
--
-- Name: business_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.business_roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.business_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: companies; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.companies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    web character varying,
    linkedin character varying,
    twitter character varying,
    company_line character varying,
    about character varying,
    country smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    modified_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);
--
-- Name: COLUMN companies.company_line; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.companies.company_line IS 'company moto';
--
-- Name: COLUMN companies.country; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.companies.country IS 'headquaters country';
--
-- Name: company_areas; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.company_areas (
    company_id uuid NOT NULL,
    area_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);
--
-- Name: TABLE company_areas; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.company_areas IS 'Companies - business areas.';
--
-- Name: company_reviews; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.company_reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    company_id uuid NOT NULL,
    person_id uuid,
    review character varying,
    score smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    CONSTRAINT company_reviews_rate_check CHECK (((score IS NULL) OR ((score > 0) AND (score <= 5)))),
    CONSTRAINT company_reviews_review_and_rate_null_check CHECK (((review IS NOT NULL) OR (score IS NOT NULL)))
);
--
-- Name: TABLE company_reviews; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.company_reviews IS 'Company reviews made by people.';
--
-- Name: COLUMN company_reviews.company_id; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.company_reviews.company_id IS 'company reviewed';
--
-- Name: COLUMN company_reviews.person_id; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.company_reviews.person_id IS 'person reviewer';
--
-- Name: COLUMN company_reviews.review; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.company_reviews.review IS 'written review by a person';
--
-- Name: COLUMN company_reviews.score; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.company_reviews.score IS 'score 1-5';
--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.countries (
    code smallint NOT NULL,
    iso2 character(2) NOT NULL,
    iso3 character(3) NOT NULL,
    name character varying NOT NULL,
    culture character varying
);
--
-- Name: COLUMN countries.code; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.countries.code IS 'Contry ISO 3166 numeric code.';
--
-- Name: COLUMN countries.iso2; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.countries.iso2 IS 'Contry ISO 3166 alpha-2 code.';
--
-- Name: COLUMN countries.iso3; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.countries.iso3 IS 'Contry ISO 3166 alpha-3 code.';
--
-- Name: COLUMN countries.culture; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.countries.culture IS 'The CultureInfo class specifies a unique name for each culture, based on RFC 4646. The name is a combination of an ISO 639 two-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. ';
--
-- Name: employee_records; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.employee_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    company_id uuid NOT NULL,
    person_id uuid NOT NULL,
    employment_started_at date NOT NULL,
    employment_ended_at date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);
--
-- Name: TABLE employee_records; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.employee_records IS 'History of employment in companies by people.';
--
-- Name: COLUMN employee_records.employment_ended_at; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.employee_records.employment_ended_at IS 'if this is null, it means person is still working there';
--
-- Name: employee_status; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.employee_status (
    id smallint NOT NULL,
    name character varying NOT NULL
);
--
-- Name: TABLE employee_status; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.employee_status IS 'List of possible statuses in regards to employment.';
--
-- Name: employee_status_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.employee_status ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: people; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.people (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    employee_status smallint,
    gender public.valid_genders,
    email character varying,
    linkedin character varying,
    twitter character varying,
    birth date,
    country smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    modified_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);
--
-- Name: COLUMN people.gender; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.people.gender IS 'M or F';
--
-- Name: person_roles; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.person_roles (
    person_id uuid NOT NULL,
    role_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);
--
-- Name: TABLE person_roles; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.person_roles IS 'Person - business roles';
--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying NOT NULL,
    name character varying,
    data json DEFAULT '{}'::json NOT NULL,
    providers character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    timezone character varying NOT NULL,
    culture character varying NOT NULL,
    person_id uuid,
    lockout_end timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
--
-- Name: TABLE users; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.users IS 'System users. May or may not be a person (in people records).';
--
-- Name: COLUMN users.email; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.users.email IS 'lowercased';
--
-- Name: COLUMN users.data; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.users.data IS 'json data received from external auth provider';
--
-- Name: COLUMN users.providers; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.users.providers IS 'list of external auth providers autorized this user';
--
-- Name: COLUMN users.timezone; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.users.timezone IS 'timezone from browser';
--
-- Name: COLUMN users.culture; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.users.culture IS 'matching culture by browser timezone';
--
-- Name: business_areas business_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.business_areas
    ADD CONSTRAINT business_areas_pkey PRIMARY KEY (id);
--
-- Name: business_role_types business_role_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.business_role_types
    ADD CONSTRAINT business_role_types_pkey PRIMARY KEY (id);
--
-- Name: business_roles business_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.business_roles
    ADD CONSTRAINT business_roles_pkey PRIMARY KEY (id);
--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);
--
-- Name: company_areas company_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT company_areas_pkey PRIMARY KEY (company_id, area_id);
--
-- Name: company_reviews company_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_reviews
    ADD CONSTRAINT company_reviews_pkey PRIMARY KEY (id);
--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (code);
--
-- Name: employee_records employee_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_records
    ADD CONSTRAINT employee_records_pkey PRIMARY KEY (id);
--
-- Name: employee_status employee_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_status
    ADD CONSTRAINT employee_status_pkey PRIMARY KEY (id);
--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);
--
-- Name: person_roles person_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT person_roles_pkey PRIMARY KEY (person_id, role_id);
--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
--
-- Name: idx_companies_country; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_companies_country ON public.companies USING btree (country);
--
-- Name: idx_company_areas_company_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_company_areas_company_id ON public.company_areas USING btree (company_id);
--
-- Name: idx_company_reviews_company_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_company_reviews_company_id ON public.company_reviews USING btree (company_id);
--
-- Name: idx_countries_iso2; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_countries_iso2 ON public.countries USING btree (iso2);
--
-- Name: idx_countries_iso3; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_countries_iso3 ON public.countries USING btree (iso3);
--
-- Name: idx_employee_records_person_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_employee_records_person_id ON public.employee_records USING btree (person_id);
--
-- Name: idx_people_employee_status; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_people_employee_status ON public.people USING btree (employee_status);
--
-- Name: idx_people_gender; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_people_gender ON public.people USING btree (gender);
--
-- Name: idx_person_roles_person_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_person_roles_person_id ON public.person_roles USING btree (person_id);
--
-- Name: idx_person_roles_role_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_person_roles_role_id ON public.person_roles USING btree (role_id);
--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);
--
-- Name: company_areas fk_area_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT fk_area_id FOREIGN KEY (area_id) REFERENCES public.business_areas(id) DEFERRABLE;
--
-- Name: company_areas fk_company_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE;
--
-- Name: employee_records fk_company_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_records
    ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE;
--
-- Name: company_reviews fk_company_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_reviews
    ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE;
--
-- Name: companies fk_country; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT fk_country FOREIGN KEY (country) REFERENCES public.countries(code) DEFERRABLE;
--
-- Name: people fk_country; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT fk_country FOREIGN KEY (country) REFERENCES public.countries(code) DEFERRABLE;
--
-- Name: company_areas fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: companies fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: person_roles fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: employee_records fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_records
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: company_reviews fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_reviews
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: people fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: people fk_employee_status; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT fk_employee_status FOREIGN KEY (employee_status) REFERENCES public.employee_status(id) DEFERRABLE;
--
-- Name: companies fk_modified_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT fk_modified_by FOREIGN KEY (modified_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: people fk_modified_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT fk_modified_by FOREIGN KEY (modified_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: company_reviews fk_person_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_reviews
    ADD CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE;
--
-- Name: employee_records fk_person_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_records
    ADD CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE;
--
-- Name: person_roles fk_person_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE;
--
-- Name: users fk_person_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE;
--
-- Name: person_roles fk_role_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES public.business_roles(id) DEFERRABLE;
--
-- Name: business_roles fk_type; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.business_roles
    ADD CONSTRAINT fk_type FOREIGN KEY (type) REFERENCES public.business_role_types(id) DEFERRABLE;
--
-- PostgreSQL database dump complete
--
END $pdd_schema$
LANGUAGE plpgsql;
