DROP FUNCTION IF EXISTS reporting.chart_3();

CREATE OR REPLACE FUNCTION reporting.chart_3() RETURNS json
    LANGUAGE sql
    AS $$
select 
    json_build_object(
        'labels', json_agg(t.name),
        'series', array[
            json_build_object('data', json_agg(t.count))
        ]
    )
from (
    select a.name, count(*)
    from 
        business_areas a
        inner join company_areas c on a.id = c.area_id
    group by 
        a.name
    order by 
        count(*) desc, a.name
) t
$$;

COMMENT ON FUNCTION reporting.chart_3() IS 'Number of companies by business area.
Json object where lables are companies name and it only have one series with the number of business area for each company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
