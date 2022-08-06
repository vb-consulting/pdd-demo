CREATE TABLE public.employee_records (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    company_id bigint NOT NULL,
    person_id bigint NOT NULL,
    employment_started_at date NOT NULL,
    employment_ended_at date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    PRIMARY KEY (id, company_id),
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE
);

COMMENT ON TABLE public.employee_records IS 'History of employment in companies by people.';
COMMENT ON COLUMN public.employee_records.employment_ended_at IS 'if this is null, it means person is still working there';
CREATE INDEX idx_employee_records_person_id ON public.employee_records USING btree (person_id);
