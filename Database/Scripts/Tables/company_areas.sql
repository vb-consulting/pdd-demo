DROP TABLE IF EXISTS public.company_areas;

CREATE TABLE public.company_areas (
    company_id bigint NOT NULL,
    area_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT pk_company_areas PRIMARY KEY (company_id, area_id),
    CONSTRAINT fk_area_id FOREIGN KEY (area_id) REFERENCES public.business_areas(id) DEFERRABLE,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE
)
PARTITION BY LIST (area_id);

COMMENT ON TABLE public.company_areas IS 'Companies - business areas.';
COMMENT ON COLUMN public.company_areas.area_id IS 'partitioned by';

CREATE TABLE public."company_areas_ai" PARTITION OF public.company_areas FOR VALUES IN ('11');
CREATE TABLE public."company_areas_bigdata" PARTITION OF public.company_areas FOR VALUES IN ('6');
CREATE TABLE public."company_areas_consumer" PARTITION OF public.company_areas FOR VALUES IN ('13');
CREATE TABLE public."company_areas_edtech" PARTITION OF public.company_areas FOR VALUES IN ('12');
CREATE TABLE public."company_areas_enterprise" PARTITION OF public.company_areas FOR VALUES IN ('2');
CREATE TABLE public."company_areas_fintech" PARTITION OF public.company_areas FOR VALUES IN ('3');
CREATE TABLE public."company_areas_general" PARTITION OF public.company_areas FOR VALUES IN ('1');
CREATE TABLE public."company_areas_hardware" PARTITION OF public.company_areas FOR VALUES IN ('9');
CREATE TABLE public."company_areas_healthcare" PARTITION OF public.company_areas FOR VALUES IN ('7');
CREATE TABLE public."company_areas_insurtech" PARTITION OF public.company_areas FOR VALUES IN ('5');
CREATE TABLE public."company_areas_manufacturing" PARTITION OF public.company_areas FOR VALUES IN ('8');
CREATE TABLE public."company_areas_mobility" PARTITION OF public.company_areas FOR VALUES IN ('4');
CREATE TABLE public."company_areas_proptech" PARTITION OF public.company_areas FOR VALUES IN ('10');
