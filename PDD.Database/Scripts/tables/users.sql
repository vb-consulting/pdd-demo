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

COMMENT ON TABLE public.users IS 'System users. May or may not be a person (in people records).';
COMMENT ON COLUMN public.users.email IS 'lowercased';
COMMENT ON COLUMN public.users.data IS 'json data received from external auth provider';
COMMENT ON COLUMN public.users.providers IS 'list of external auth providers autorized this user';
COMMENT ON COLUMN public.users.timezone IS 'timezone from browser';
COMMENT ON COLUMN public.users.culture IS 'matching culture by browser timezone';
CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);
