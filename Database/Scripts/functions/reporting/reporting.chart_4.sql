DROP FUNCTION IF EXISTS reporting.chart_4();

CREATE OR REPLACE FUNCTION reporting.chart_4() RETURNS json
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
            json_build_object('data', json_agg(sub.count))
        ]
    )
from (
    select name, count, row_number 
    from cte 
    where row_number < 10
    union all
    select 'Other' as name, sum(count) as count, 10 as row_number 
    from cte 
    where row_number >= 10
    order by row_number
) sub
$$;

COMMENT ON FUNCTION reporting.chart_4() IS 'Number of companies by country.
Json object where lables are country names and it only have one series with the number of companies for each country.
It show only first 9 conutries and 10th is summed together as other. 
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';