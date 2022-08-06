CREATE TABLE public.countries (
    code smallint NOT NULL PRIMARY KEY,
    iso2 character(2) NOT NULL,
    iso3 character(3) NOT NULL,
    name character varying NOT NULL,
    name_normalized character varying GENERATED ALWAYS AS (lower((name)::text)) STORED NOT NULL,
    culture character varying
);

COMMENT ON COLUMN public.countries.code IS 'Contry ISO 3166 numeric code.';
COMMENT ON COLUMN public.countries.iso2 IS 'Contry ISO 3166 alpha-2 code.';
COMMENT ON COLUMN public.countries.iso3 IS 'Contry ISO 3166 alpha-3 code.';
COMMENT ON COLUMN public.countries.name_normalized IS 'lowercased';
COMMENT ON COLUMN public.countries.culture IS 'The CultureInfo class specifies a unique name for each culture, based on RFC 4646. The name is a combination of an ISO 639 two-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. ';
CREATE INDEX idx_countries_iso2 ON public.countries USING btree (iso2);
CREATE INDEX idx_countries_iso3 ON public.countries USING btree (iso3);
CREATE INDEX idx_countries_name_normalized ON public.countries USING btree (name_normalized);
