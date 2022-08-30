DO $pdd_schema$
BEGIN
--
-- PostgreSQL database dump
--
-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.5
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
DROP INDEX IF EXISTS public.idx_people_name_normalized;
DROP INDEX IF EXISTS public.idx_people_gender;
DROP INDEX IF EXISTS public.idx_people_employee_status;
DROP INDEX IF EXISTS public.idx_employee_status_name_normalized;
DROP INDEX IF EXISTS public.idx_employee_records_person_id;
DROP INDEX IF EXISTS public.idx_countries_name_normalized;
DROP INDEX IF EXISTS public.idx_countries_iso3;
DROP INDEX IF EXISTS public.idx_countries_iso2;
DROP INDEX IF EXISTS public.idx_company_reviews_company_id;
DROP INDEX IF EXISTS public.idx_company_areas_company_id;
DROP INDEX IF EXISTS public.idx_companies_name_normalized;
DROP INDEX IF EXISTS public.idx_companies_country;
DROP INDEX IF EXISTS public.idx_business_roles_name_normalized;
DROP INDEX IF EXISTS public.idx_business_role_types_name_normalized;
DROP INDEX IF EXISTS public.idx_business_areas_name_normalized;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS pk_company_areas;
ALTER TABLE IF EXISTS ONLY public.person_roles DROP CONSTRAINT IF EXISTS person_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS people_pkey;
ALTER TABLE IF EXISTS ONLY public.employee_status DROP CONSTRAINT IF EXISTS employee_status_pkey;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS employee_records_pkey;
ALTER TABLE IF EXISTS ONLY public.countries DROP CONSTRAINT IF EXISTS countries_pkey;
ALTER TABLE IF EXISTS ONLY public.company_reviews DROP CONSTRAINT IF EXISTS company_reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS companies_pkey;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS companies_name_normalized_key;
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
DROP FUNCTION IF EXISTS reporting.chart_employee_counts_by_year(_limit integer);
DROP FUNCTION IF EXISTS reporting.chart_employee_counts_by_area(_limit integer);
DROP FUNCTION IF EXISTS reporting.chart_companies_by_country(_limit integer);
DROP TYPE IF EXISTS public.valid_genders;
DROP EXTENSION IF EXISTS pg_trgm;
DROP SCHEMA IF EXISTS reporting;
--
-- Name: reporting; Type: SCHEMA; Schema: -; Owner: -
--
CREATE SCHEMA reporting;
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
-- Name: chart_companies_by_country(integer); Type: FUNCTION; Schema: reporting; Owner: -
--
CREATE FUNCTION reporting.chart_companies_by_country(_limit integer DEFAULT 10) RETURNS json
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
            json_build_object('data', json_agg(sub.count))
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
-- Name: FUNCTION chart_companies_by_country(_limit integer); Type: COMMENT; Schema: reporting; Owner: -
--
COMMENT ON FUNCTION reporting.chart_companies_by_country(_limit integer) IS 'Number of companies by country.
Json object where lables are country names and it only have one series with the number of companies for each country.
It show only first 9 conutries and 10th is summed together as other. 
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
--
-- Name: chart_employee_counts_by_area(integer); Type: FUNCTION; Schema: reporting; Owner: -
--
CREATE FUNCTION reporting.chart_employee_counts_by_area(_limit integer DEFAULT 3) RETURNS json
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
--
-- Name: FUNCTION chart_employee_counts_by_area(_limit integer); Type: COMMENT; Schema: reporting; Owner: -
--
COMMENT ON FUNCTION reporting.chart_employee_counts_by_area(_limit integer) IS 'Business areas, the number of employees for top 3 companies by highest number of employees.
Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
';
--
-- Name: chart_employee_counts_by_year(integer); Type: FUNCTION; Schema: reporting; Owner: -
--
CREATE FUNCTION reporting.chart_employee_counts_by_year(_limit integer DEFAULT 5) RETURNS json
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
                'labels', _years::text[],
                'series', array_agg(
                    json_build_object(
                        'data', data,
                        'label', label
                    )
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
--
-- Name: FUNCTION chart_employee_counts_by_year(_limit integer); Type: COMMENT; Schema: reporting; Owner: -
--
COMMENT ON FUNCTION reporting.chart_employee_counts_by_year(_limit integer) IS 'Top 5 comapnies by number of employees for the last ten years.
Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
- Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
';
SET default_tablespace = '';
SET default_table_access_method = heap;
--
-- Name: business_areas; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.business_areas (
    id smallint NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL
);
--
-- Name: TABLE business_areas; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.business_areas IS 'Business areas that companies may be invloved.';
--
-- Name: COLUMN business_areas.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.business_areas.name_normalized IS 'lowercased';
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
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL
);
--
-- Name: TABLE business_role_types; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.business_role_types IS 'Types or groups of business roles.';
--
-- Name: COLUMN business_role_types.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.business_role_types.name_normalized IS 'lowercased';
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
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL,
    type smallint NOT NULL
);
--
-- Name: TABLE business_roles; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.business_roles IS 'Roles in a team that employees are specialized working with.';
--
-- Name: COLUMN business_roles.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.business_roles.name_normalized IS 'lowercased';
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
    id bigint NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL,
    web character varying,
    linkedin character varying,
    tweeter character varying,
    company_line character varying,
    about character varying,
    country smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    modified_by bigint DEFAULT 1 NOT NULL
);
--
-- Name: COLUMN companies.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.companies.name_normalized IS 'lowercased, trigram index';
--
-- Name: COLUMN companies.company_line; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.companies.company_line IS 'company moto';
--
-- Name: COLUMN companies.country; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.companies.country IS 'headquaters country';
--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.companies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: company_areas; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.company_areas (
    company_id bigint NOT NULL,
    area_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL
);
--
-- Name: TABLE company_areas; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.company_areas IS 'Companies - business areas.';
--
-- Name: company_reviews; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.company_reviews (
    id bigint NOT NULL,
    company_id bigint NOT NULL,
    person_id bigint,
    review character varying NOT NULL,
    score smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT company_reviews_rate_check CHECK (((score IS NULL) OR ((score > 0) AND (score <= 5))))
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
-- Name: company_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.company_reviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.company_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.countries (
    code smallint NOT NULL,
    iso2 character(2) NOT NULL,
    iso3 character(3) NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL,
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
-- Name: COLUMN countries.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.countries.name_normalized IS 'lowercased';
--
-- Name: COLUMN countries.culture; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.countries.culture IS 'The CultureInfo class specifies a unique name for each culture, based on RFC 4646. The name is a combination of an ISO 639 two-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. ';
--
-- Name: employee_records; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.employee_records (
    id bigint NOT NULL,
    company_id bigint NOT NULL,
    person_id bigint NOT NULL,
    employment_started_at date NOT NULL,
    employment_ended_at date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL
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
-- Name: employee_records_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.employee_records ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: employee_status; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.employee_status (
    id smallint NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL
);
--
-- Name: TABLE employee_status; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.employee_status IS 'List of possible statuses in regards to employment.';
--
-- Name: COLUMN employee_status.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.employee_status.name_normalized IS 'lowercased';
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
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (((lower((first_name)::text) || ' '::text) || lower((last_name)::text))) STORED NOT NULL,
    employee_status smallint NOT NULL,
    gender public.valid_genders,
    email character varying,
    linkedin character varying,
    twitter character varying,
    birth date,
    country smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    modified_by bigint DEFAULT 1 NOT NULL
);
--
-- Name: COLUMN people.name_normalized; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.people.name_normalized IS 'first namer + last name, trigram index';
--
-- Name: COLUMN people.gender; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON COLUMN public.people.gender IS 'M or F';
--
-- Name: people_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.people ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.people_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
-- Name: person_roles; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.person_roles (
    person_id bigint NOT NULL,
    role_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL
);
--
-- Name: TABLE person_roles; Type: COMMENT; Schema: public; Owner: -
--
COMMENT ON TABLE public.person_roles IS 'Person - business roles';
--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying NOT NULL,
    name character varying,
    data json DEFAULT '{}'::json NOT NULL,
    providers character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    timezone character varying NOT NULL,
    culture character varying NOT NULL,
    person_id bigint,
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
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
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
-- Name: companies companies_name_normalized_key; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_name_normalized_key UNIQUE (name_normalized);
--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);
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
    ADD CONSTRAINT employee_records_pkey PRIMARY KEY (id, company_id);
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
-- Name: company_areas pk_company_areas; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT pk_company_areas PRIMARY KEY (company_id, area_id);
--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
--
-- Name: idx_business_areas_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_business_areas_name_normalized ON public.business_areas USING btree (name_normalized);
--
-- Name: idx_business_role_types_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_business_role_types_name_normalized ON public.business_role_types USING btree (name_normalized);
--
-- Name: idx_business_roles_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_business_roles_name_normalized ON public.business_roles USING btree (name_normalized);
--
-- Name: idx_companies_country; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_companies_country ON public.companies USING btree (country);
--
-- Name: idx_companies_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_companies_name_normalized ON public.companies USING gist (name_normalized public.gist_trgm_ops);
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
-- Name: idx_countries_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_countries_name_normalized ON public.countries USING btree (name_normalized);
--
-- Name: idx_employee_records_person_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_employee_records_person_id ON public.employee_records USING btree (person_id);
--
-- Name: idx_employee_status_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_employee_status_name_normalized ON public.employee_status USING btree (name_normalized);
--
-- Name: idx_people_employee_status; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_people_employee_status ON public.people USING btree (employee_status);
--
-- Name: idx_people_gender; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_people_gender ON public.people USING btree (gender);
--
-- Name: idx_people_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_people_name_normalized ON public.people USING gist (name_normalized public.gist_trgm_ops);
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
