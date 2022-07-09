DROP INDEX IF EXISTS public.idx_business_roles_name_normalized;
DROP TABLE IF EXISTS public.business_roles;

CREATE TABLE public.business_roles (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying NOT NULL
);

CREATE UNIQUE INDEX idx_business_roles_name_normalized ON public.business_roles USING btree (name_normalized);
