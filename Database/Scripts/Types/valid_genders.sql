DROP TYPE IF EXISTS public.valid_genders;

CREATE TYPE public.valid_genders AS ENUM (
    'M',
    'F'
);
