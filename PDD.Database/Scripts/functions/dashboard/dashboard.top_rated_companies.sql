CREATE OR REPLACE FUNCTION dashboard.top_rated_companies(
    _limit integer
)
RETURNS json
LANGUAGE sql
AS $$
select json_agg(sub)
from (
    select
        comp.id,
        comp.name,
        company_line as "companyLine",
        country.name as "country",
        country.code as "countrycode",
        country.iso2 as "countryiso2",
        (
            select array_agg(json_build_object('id', id, 'name', name))
            from (
                select 
                    ba.id, ba.name
                from company_areas ca
                inner join business_areas ba on ca.area_id = ba.id
                where 
                    ca.company_id = comp.id
                group by
                    ba.id, ba.name
            ) sub
        ) as areas,
        avg(rev.score) filter (where rev.score is not null)::numeric(3,2) as score,
        count(rev.id) as reviews
    from 
        companies comp 
        inner join countries country on comp.country = country.code
        left outer join company_reviews rev on comp.id = rev.company_id
    group by
        comp.id,
        comp.name,
        company_line,
        country.name,
        country.code,
        country.iso2
    order by
        avg(rev.score) desc nulls last,
        comp.created_at desc,
        comp.name
    limit _limit
) sub
$$;

COMMENT ON FUNCTION dashboard.top_rated_companies(_limit integer) IS 'Top rated companies by the user score.';
