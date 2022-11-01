CREATE OR REPLACE FUNCTION public.search_countries(_search character varying, _skip integer, _take integer) RETURNS json
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
        c.code
    from 
        countries c
    where (
        _search is null 
        or name_normalized like _search
    );
    get diagnostics _count = row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select json_agg(sub)
            from ( 
                select 
                    c.code as value, 
                    c.name
                from 
                    _tmp tmp
                    inner join countries c on tmp.code = c.code
                order by c.name_normalized
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;
