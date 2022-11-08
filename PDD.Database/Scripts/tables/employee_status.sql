CREATE TABLE public.employee_status (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL
);

COMMENT ON TABLE public.employee_status IS 'List of possible statuses in regards to employment.';
