CREATE TABLE public.business_areas (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL
);

COMMENT ON TABLE public.business_areas IS 'Business areas that companies may be invloved.';
