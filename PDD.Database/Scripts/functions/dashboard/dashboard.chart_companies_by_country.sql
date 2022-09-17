CREATE OR REPLACE FUNCTION dashboard.chart_companies_by_country(_limit integer) RETURNS json
    LANGUAGE sql
    AS $$
with cte as (
    select 
        b.name, count(*), row_number () over (order by count(*) desc, b.name)
    from
        companies a
        inner join countries b on a.country = b.code
    group by 
        b.name
    order by
        count(*) desc, b.name
)
select
    json_build_object(
        'labels', json_agg(sub.name),
        'series', array[
            json_build_object('data', json_agg(coalesce(sub.count, 0)))
        ]
    )
from (
    select name, count, row_number 
    from cte 
    where row_number < coalesce(_limit, 10)
    union all
    select 'Other' as name, sum(count) as count, 10 as row_number 
    from cte 
    where row_number >= coalesce(_limit, 10)
    order by row_number
) sub
$$;

COMMENT ON FUNCTION dashboard.chart_companies_by_country(_limit integer) IS 'Number of companies by country.
JSON object where labels are country names and it only have one series with the number of companies for each country.
It show only first 9 countries and 10th is summed together as other. 
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
