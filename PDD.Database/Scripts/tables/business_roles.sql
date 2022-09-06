CREATE TABLE public.business_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL,
    type uuid NOT NULL,
    CONSTRAINT fk_type FOREIGN KEY (type) REFERENCES public.business_role_types(id) DEFERRABLE
);

COMMENT ON TABLE public.business_roles IS 'Roles in a team that employees are specialized working with.';
COMMENT ON COLUMN public.business_roles.name_normalized IS 'lowercased';
CREATE UNIQUE INDEX idx_business_roles_name_normalized ON public.business_roles USING btree (name_normalized);
