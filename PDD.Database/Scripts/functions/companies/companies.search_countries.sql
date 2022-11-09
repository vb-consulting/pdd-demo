CREATE OR REPLACE FUNCTION companies.search_countries(_search character varying, _skip integer, _take integer) RETURNS json
LANGUAGE plpgsql
AS $$
declare
    _count bigint;
    _row_count bigint;
begin    
    _search = trim(_search);
    
    if _search = '' then
        _search = null;
    end if;
    
    if _search is not null then
        _search = '%' || _search || '%';
    end if;
    
    create temp table _tmp on commit drop as
    select 
        a.code
    from
        countries a
        inner join companies b on a.code = b.country
    where (
        _search is null 
        or a.name ilike _search
        or a.iso2 ilike _search
        or a.iso3 ilike _search
    )
    group by 
        a.code
    order by 
        a.name;
        
    get diagnostics _count = row_count;
    
    insert into _tmp values (null);
    
    insert into _tmp
    select 
        a.code
    from
        countries a
        left outer join companies b on a.code = b.country
    where
        b.id is null
        and (
            _search is null 
            or a.name ilike _search
            or a.iso2 ilike _search
            or a.iso3 ilike _search
        )
    order by a.name;
    
    get diagnostics _row_count = row_count;
    _count = _count + _row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select json_agg(sub)
            from ( 
                select 
                    c.code as value, 
                    c.name,
                    c.iso2,
                    c.iso3
                from 
                    _tmp tmp
                    left outer join countries c on tmp.code = c.code
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;

COMMENT ON FUNCTION companies.search_countries(_search character varying, _skip integer, _take integer) IS 'Search countries by name or iso2 or iso3.
Result is pageable JSON response `{count, data: [...]}`
Data record has value and name suitable for select type controls.
Countries with companies are sorted first by name, followed by null record (separator) and then by countries without companies sorted by name.';
