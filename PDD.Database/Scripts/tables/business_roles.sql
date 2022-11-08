CREATE TABLE public.business_roles (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL,
    type smallint NOT NULL,
    CONSTRAINT fk_type FOREIGN KEY (type) REFERENCES public.business_role_types(id) DEFERRABLE
);

COMMENT ON TABLE public.business_roles IS 'Roles in a team that employees are specialized working with.';
