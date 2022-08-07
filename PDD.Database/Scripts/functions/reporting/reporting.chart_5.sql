CREATE OR REPLACE FUNCTION reporting.chart_5(_limit integer DEFAULT 10) RETURNS json
    LANGUAGE sql
    AS $$
select 
    json_build_object(
        'labels', json_agg(t.name || ' (avg score: ' || t.avg || ')'),
        'series', array[
            json_build_object(
                'data', json_agg(t.count)
            )
        ]
    )
from (
    select c.name, count(*), avg(r.score)::numeric(3,2)
    from 
        company_reviews r
        inner join companies c on r.company_id = c.id
    group by
        c.name
    order by count(*) desc, c.name
    limit coalesce(_limit, 10)
) t
$$;

COMMENT ON FUNCTION reporting.chart_5(_limit integer) IS 'Top 10 comanies with highest number of user reviews.
Json object where lables are companies names with average score and it only have one series with total number of reviews.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
