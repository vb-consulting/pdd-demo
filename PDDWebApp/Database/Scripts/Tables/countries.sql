DROP INDEX IF EXISTS public.idx_countries_name_normalized;
DROP TABLE IF EXISTS public.countries;

CREATE TABLE public.countries (
    code smallint NOT NULL PRIMARY KEY,
    iso2 character(2) NOT NULL,
    iso3 character(3) NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying NOT NULL,
    culture character varying
);

CREATE INDEX idx_countries_name_normalized ON public.countries USING btree (name_normalized);
