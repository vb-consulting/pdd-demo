CREATE TABLE public.business_role_types (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL
);

COMMENT ON TABLE public.business_role_types IS 'Types or groups of business roles.';
