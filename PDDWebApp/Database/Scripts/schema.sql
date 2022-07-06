DO $pdd_schema$
BEGIN
--
-- PostgreSQL database dump
--
-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0
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
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS fk_person_id;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_modified_by;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS fk_modified_by;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS fk_created_by;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS fk_country;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS fk_country;
ALTER TABLE IF EXISTS ONLY public.employee_records DROP CONSTRAINT IF EXISTS fk_company_id;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS fk_company_id;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS fk_area_id;
DROP INDEX IF EXISTS public.idx_users_email;
DROP INDEX IF EXISTS public.idx_people_name_normalized;
DROP INDEX IF EXISTS public.idx_countries_name_normalized;
DROP INDEX IF EXISTS public.idx_company_id_person_id;
DROP INDEX IF EXISTS public.idx_companies_name_normalized;
DROP INDEX IF EXISTS public.idx_areas_name_normalized;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.company_areas DROP CONSTRAINT IF EXISTS pk_company_areas;
ALTER TABLE IF EXISTS ONLY public.people DROP CONSTRAINT IF EXISTS people_pkey;
ALTER TABLE IF EXISTS ONLY public.countries DROP CONSTRAINT IF EXISTS countries_pkey;
ALTER TABLE IF EXISTS ONLY public.companies DROP CONSTRAINT IF EXISTS companies_pkey;
ALTER TABLE IF EXISTS ONLY public.areas DROP CONSTRAINT IF EXISTS areas_pkey;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.people;
DROP TABLE IF EXISTS public.employee_records;
DROP TABLE IF EXISTS public.countries;
DROP TABLE IF EXISTS public.company_areas;
DROP TABLE IF EXISTS public.companies;
DROP TABLE IF EXISTS public.areas;
SET default_tablespace = '';
SET default_table_access_method = heap;
--
-- Name: areas; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.areas (
    id smallint NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying NOT NULL
);
--
-- Name: areas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
ALTER TABLE public.areas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.areas_id_seq
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
    name_normalized character varying NOT NULL,
    email character varying,
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
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.countries (
    code smallint NOT NULL,
    iso2 character(2) NOT NULL,
    iso3 character(3) NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying NOT NULL,
    culture character varying
);
--
-- Name: employee_records; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.employee_records (
    company_id bigint NOT NULL,
    person_id smallint NOT NULL,
    employment_started_at date NOT NULL,
    employment_ended_at date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL
);
--
-- Name: people; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.people (
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    name_normalized character varying NOT NULL,
    email character varying,
    linkedin character varying,
    twitter character varying,
    phone character varying,
    birth date,
    country smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    modified_by bigint DEFAULT 1 NOT NULL
);
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
    lockout_end timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
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
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);
--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);
--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (code);
--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);
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
-- Name: idx_areas_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_areas_name_normalized ON public.areas USING btree (name_normalized);
--
-- Name: idx_companies_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_companies_name_normalized ON public.companies USING btree (name_normalized);
--
-- Name: idx_company_id_person_id; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_company_id_person_id ON public.employee_records USING btree (company_id, person_id);
--
-- Name: idx_countries_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_countries_name_normalized ON public.countries USING btree (name_normalized);
--
-- Name: idx_people_name_normalized; Type: INDEX; Schema: public; Owner: -
--
CREATE INDEX idx_people_name_normalized ON public.people USING btree (name_normalized);
--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--
CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);
--
-- Name: company_areas fk_area_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT fk_area_id FOREIGN KEY (area_id) REFERENCES public.areas(id) DEFERRABLE;
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
-- Name: companies fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: company_areas fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.company_areas
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: people fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.people
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
--
-- Name: employee_records fk_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_records
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE;
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
-- Name: employee_records fk_person_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.employee_records
    ADD CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE;
--
-- PostgreSQL database dump complete
--
END $pdd_schema$
LANGUAGE plpgsql;
