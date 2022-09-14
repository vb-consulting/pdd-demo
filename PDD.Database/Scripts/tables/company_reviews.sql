CREATE TABLE public.company_reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    company_id uuid NOT NULL,
    person_id uuid,
    review character varying,
    score smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    CONSTRAINT company_reviews_rate_check CHECK (((score IS NULL) OR ((score > 0) AND (score <= 5)))),
    CONSTRAINT company_reviews_review_and_rate_null_check CHECK (((review IS NOT NULL) OR (score IS NOT NULL))),
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE
);

COMMENT ON TABLE public.company_reviews IS 'Company reviews made by people.';
COMMENT ON COLUMN public.company_reviews.company_id IS 'company reviewed';
COMMENT ON COLUMN public.company_reviews.person_id IS 'person reviewer';
COMMENT ON COLUMN public.company_reviews.review IS 'written review by a person';
COMMENT ON COLUMN public.company_reviews.score IS 'score 1-5';
CREATE INDEX idx_company_reviews_company_id ON public.company_reviews USING btree (company_id);
