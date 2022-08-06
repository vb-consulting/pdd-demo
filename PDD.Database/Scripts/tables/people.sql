CREATE TABLE public.people (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
    modified_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT fk_country FOREIGN KEY (country) REFERENCES public.countries(code) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_employee_status FOREIGN KEY (employee_status) REFERENCES public.employee_status(id) DEFERRABLE,
    CONSTRAINT fk_modified_by FOREIGN KEY (modified_by) REFERENCES public.users(id) DEFERRABLE
);

COMMENT ON COLUMN public.people.name_normalized IS 'first namer + last name, trigram index';
COMMENT ON COLUMN public.people.gender IS 'M or F';
CREATE INDEX idx_people_employee_status ON public.people USING btree (employee_status);
CREATE INDEX idx_people_gender ON public.people USING btree (gender);
CREATE INDEX idx_people_name_normalized ON public.people USING gist (name_normalized public.gist_trgm_ops);
