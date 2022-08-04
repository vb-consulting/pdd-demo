DROP INDEX IF EXISTS public.idx_companies_name_normalized;
DROP INDEX IF EXISTS public.idx_companies_country;
DROP TABLE IF EXISTS public.companies;

CREATE TABLE public.companies (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL UNIQUE,
    web character varying,
    linkedin character varying,
    tweeter character varying,
    company_line character varying,
    about character varying,
    country smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    modified_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT fk_country FOREIGN KEY (country) REFERENCES public.countries(code) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_modified_by FOREIGN KEY (modified_by) REFERENCES public.users(id) DEFERRABLE
);

COMMENT ON COLUMN public.companies.name_normalized IS 'lowercased, trigram index';
COMMENT ON COLUMN public.companies.company_line IS 'company moto';
COMMENT ON COLUMN public.companies.country IS 'headquaters country';
CREATE INDEX idx_companies_country ON public.companies USING btree (country);
CREATE INDEX idx_companies_name_normalized ON public.companies USING gist (name_normalized public.gist_trgm_ops);
