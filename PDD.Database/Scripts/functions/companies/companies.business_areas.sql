CREATE OR REPLACE FUNCTION companies.business_areas() RETURNS TABLE(
    value smallint,
    name character varying
)
LANGUAGE sql
AS $$
select id as value, name from business_areas;
$$;

COMMENT ON FUNCTION companies.business_areas() IS 'select value and name from business_areas';
