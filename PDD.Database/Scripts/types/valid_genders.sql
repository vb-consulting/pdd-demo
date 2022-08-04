DROP TYPE IF EXISTS public.valid_genders;

CREATE TYPE public.valid_genders AS ENUM (
    'M',
    'F'
);

COMMENT ON TYPE public.valid_genders IS 'There are only two genders.';
