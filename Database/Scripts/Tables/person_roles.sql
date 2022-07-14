DROP TABLE IF EXISTS public.person_roles;

CREATE TABLE public.person_roles (
    person_id bigint NOT NULL,
    role_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    PRIMARY KEY (person_id, role_id),
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE,
    CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES public.business_roles(id) DEFERRABLE
)
PARTITION BY LIST (person_id);

COMMENT ON TABLE public.person_roles IS 'Person - business roles';
COMMENT ON COLUMN public.person_roles.person_id IS 'partition by';
