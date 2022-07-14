DROP TABLE IF EXISTS public.company_reviews;

CREATE TABLE public.company_reviews (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    company_id bigint NOT NULL,
    person_id bigint,
    review character varying NOT NULL,
    score smallint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    modified_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by bigint DEFAULT 1 NOT NULL,
    CONSTRAINT company_reviews_rate_check CHECK (((score IS NULL) OR ((score > 0) AND (score <= 5)))),
    PRIMARY KEY (id, company_id),
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES public.companies(id) DEFERRABLE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) DEFERRABLE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES public.people(id) DEFERRABLE
)
PARTITION BY LIST (company_id);

COMMENT ON TABLE public.company_reviews IS 'Company reviews made by people.';
COMMENT ON COLUMN public.company_reviews.company_id IS 'company reviewed, partitioned by';
COMMENT ON COLUMN public.company_reviews.person_id IS 'person reviewer';
COMMENT ON COLUMN public.company_reviews.review IS 'written review by a person';
COMMENT ON COLUMN public.company_reviews.score IS 'score 1-5';
