DROP INDEX IF EXISTS public.idx_users_email;
DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email character varying NOT NULL,
    name character varying,
    data json DEFAULT '{}'::json NOT NULL,
    providers character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    timezone character varying NOT NULL,
    culture character varying NOT NULL,
    person_id bigint,
    lockout_end timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE
);

CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);
