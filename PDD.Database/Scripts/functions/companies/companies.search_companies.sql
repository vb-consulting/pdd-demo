CREATE OR REPLACE FUNCTION companies.search_companies(_search character varying, _skip integer, _take integer) RETURNS json
LANGUAGE plpgsql
AS $$
declare
    _count bigint;
begin    
    _search = trim(_search);
    
    if _search = '' then
        _search = null;
    end if;
    
    if _search is not null then
        _search = '%' || lower(_search) || '%';
    end if;
    
    create temp table _tmp on commit drop as
    select 
        c.id
    from 
        companies c
    where (
        _search is null or name_normalized like _search
    );
    
    get diagnostics _count = row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select json_agg(sub)
            from ( 
                select 
                    cm.id, 
                    cm.name, 
                    company_line as companyLine, 
                    about,
                    cn.code as countryCode,
                    cn.name as country,
                    coalesce(array_agg(ba.name) filter (where ba.name is not null), array[]::varchar[]) as areas
                from 
                    _tmp tmp
                    inner join companies cm on tmp.id = cm.id
                    inner join countries cn on cm.country = cn.code
                    left outer join company_areas ca on cm.id = ca.company_id
                    left outer join business_areas ba on ca.area_id = ba.id
                group by
                    cm.id, cn.code
                order by 
                    cm.name_normalized
                limit _take 
                offset _skip                
            ) sub
        )
    );
end
$$;
