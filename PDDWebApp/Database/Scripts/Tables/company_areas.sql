DROP TABLE IF EXISTS public.company_areas;

CREATE TABLE public.company_areas (
    company_id bigint NOT NULL,
    area_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT pk_company_areas PRIMARY KEY (company_id, area_id),
    CONSTRAINT fk_area_id FOREIGN KEY (area_id) REFERENCES public.areas(id) DEFERRABLE,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE
);
