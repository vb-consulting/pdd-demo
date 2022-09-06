CREATE TABLE public.employee_status (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL
);

COMMENT ON TABLE public.employee_status IS 'List of possible statuses in regards to employment.';
COMMENT ON COLUMN public.employee_status.name_normalized IS 'lowercased';
CREATE UNIQUE INDEX idx_employee_status_name_normalized ON public.employee_status USING btree (name_normalized);
