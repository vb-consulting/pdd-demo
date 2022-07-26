DROP INDEX IF EXISTS public.idx_person_roles_role_id;
DROP INDEX IF EXISTS public.idx_person_roles_person_id;
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
);

COMMENT ON TABLE public.person_roles IS 'Person - business roles';
CREATE INDEX idx_person_roles_person_id ON public.person_roles USING btree (person_id);
CREATE INDEX idx_person_roles_role_id ON public.person_roles USING btree (role_id);
