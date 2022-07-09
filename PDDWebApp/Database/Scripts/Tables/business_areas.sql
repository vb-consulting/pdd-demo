DROP INDEX IF EXISTS public.idx_business_areas_name_normalized;
DROP TABLE IF EXISTS public.business_areas;

CREATE TABLE public.business_areas (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY,
    name character varying NOT NULL,
    name_normalized character varying NOT NULL,
    CONSTRAINT areas_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_business_areas_name_normalized ON public.business_areas USING btree (name_normalized);
