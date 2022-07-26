DROP FUNCTION IF EXISTS reporting.get_chart_data_1();

CREATE OR REPLACE FUNCTION reporting.get_chart_data_1() RETURNS json
    LANGUAGE sql
    AS $$
select 
    json_build_object(
        'companies', json_build_object(
            'labels', json_agg(t.name),
            'values', json_agg(t.count)
        )
    )
from (
    select c.name, count(*)
    from 
        companies c
        inner join employee_records er on c.id = er.company_id and er.employment_ended_at is null
    group by 
        c.id, c.name
    order by 
        count(*) desc, c.name
    limit 10
) t
$$;

COMMENT ON FUNCTION reporting.get_chart_data_1() IS 'Top 10 comapnies by number of current employees.
Json object witjh one series where labeles are comapnis names and values are number of current employees.';
