DROP INDEX IF EXISTS public.idx_areas_name_normalized;
DROP TABLE IF EXISTS public.areas;

CREATE TABLE public.areas (
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL,
    name_normalized character varying NOT NULL
);

CREATE UNIQUE INDEX idx_areas_name_normalized ON public.areas USING btree (name_normalized);
