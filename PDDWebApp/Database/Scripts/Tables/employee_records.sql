DROP INDEX IF EXISTS public.idx_company_id_person_id;
DROP TABLE IF EXISTS public.employee_records;

CREATE TABLE public.employee_records (
    company_id bigint NOT NULL,
    person_id smallint NOT NULL,
    employment_started_at date NOT NULL,
    employment_ended_at date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE
);

CREATE INDEX idx_company_id_person_id ON public.employee_records USING btree (company_id, person_id);
