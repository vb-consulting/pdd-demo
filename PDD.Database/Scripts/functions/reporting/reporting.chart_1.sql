CREATE OR REPLACE FUNCTION reporting.chart_1() RETURNS json
    LANGUAGE sql
    AS $$
select 
    json_build_object(
        'labels', json_agg(t.name || ' (avg score: ' || r.avg || ')'),
        'series', array[
            json_build_object('data', json_agg(t.count))
        ]
    )
from (
    
        select c.id, c.name, count(*)
        from 
            companies c
            inner join employee_records er on c.id = er.company_id and er.employment_ended_at is null
        group by 
            c.id, c.name
        order by 
            count(*) desc, c.name
        limit 10
    
    ) t left join lateral (    
        select avg(r.score)::numeric(3,2) from company_reviews r where r.company_id = t.id
    ) r on true
$$;

COMMENT ON FUNCTION reporting.chart_1() IS 'Top 10 comapnies by number of current employees.
Json object where lables are companies name with average score included and it only have one series with the number of current employees for each company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
';
