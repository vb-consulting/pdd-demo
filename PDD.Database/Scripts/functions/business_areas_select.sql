CREATE OR REPLACE FUNCTION public.business_areas_select() RETURNS json
LANGUAGE sql
AS $$
select json_build_object(
    'count', (select count(*) from business_areas),
    'page', (
        select json_agg(sub)
        from ( 
            select id as value, name from business_areas
        ) sub
    )
)
$$;
