CREATE OR REPLACE FUNCTION dashboard.top_rated_companies(_limit integer) RETURNS TABLE(
    id uuid,
    name character varying,
    company_line character varying,
    country character varying,
    country_code smallint,
    areas character varying[],
    score numeric,
    reviews bigint
)
LANGUAGE sql
AS $$
select 
    comp.id,
    comp.name,
    company_line,
    country.name as country,
    country.code as country_code,
    ca.areas,
    avg(rev.score) filter (where rev.score is not null)::numeric(3,2) as score,
    count(rev.id) as reviews
from 
    companies comp 
    inner join countries country on comp.country = country.code
    left outer join company_reviews rev on comp.id = rev.company_id
    join lateral (
        select 
            array_remove(array_agg(distinct ba.name), null) as areas
        from company_areas ca
        inner join business_areas ba on ca.area_id = ba.id
        where 
            ca.company_id = comp.id
    ) ca on true
group by
    comp.id,
    comp.name,
    company_line,
    country.name,
    country.code,
    ca.areas
order by
    avg(rev.score) desc nulls last,
    comp.created_at desc,
    comp.name
limit _limit;
$$;

COMMENT ON FUNCTION dashboard.top_rated_companies(_limit integer) IS 'Top rated companies by the user score.';
