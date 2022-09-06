CREATE TABLE public.business_areas (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL
);

COMMENT ON TABLE public.business_areas IS 'Business areas that companies may be invloved.';
COMMENT ON COLUMN public.business_areas.name_normalized IS 'lowercased';
CREATE UNIQUE INDEX idx_business_areas_name_normalized ON public.business_areas USING btree (name_normalized);
