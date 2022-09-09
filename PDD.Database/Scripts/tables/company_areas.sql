CREATE TABLE public.company_areas (
    company_id uuid NOT NULL,
    area_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    PRIMARY KEY (company_id, area_id),
    CONSTRAINT fk_area_id FOREIGN KEY (area_id) REFERENCES public.business_areas(id) DEFERRABLE,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE
);

COMMENT ON TABLE public.company_areas IS 'Companies - business areas.';
CREATE INDEX idx_company_areas_company_id ON public.company_areas USING btree (company_id);
