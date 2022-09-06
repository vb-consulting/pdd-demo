CREATE TABLE public.business_role_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL
);

COMMENT ON TABLE public.business_role_types IS 'Types or groups of business roles.';
COMMENT ON COLUMN public.business_role_types.name_normalized IS 'lowercased';
CREATE UNIQUE INDEX idx_business_role_types_name_normalized ON public.business_role_types USING btree (name_normalized);
