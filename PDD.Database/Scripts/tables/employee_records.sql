CREATE TABLE public.employee_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    company_id uuid NOT NULL,
    person_id uuid NOT NULL,
    employment_started_at date NOT NULL,
    employment_ended_at date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE
);

COMMENT ON TABLE public.employee_records IS 'History of employment in companies by people.';
COMMENT ON COLUMN public.employee_records.employment_ended_at IS 'if this is null, it means person is still working there';
CREATE INDEX idx_employee_records_person_id ON public.employee_records USING btree (person_id);
