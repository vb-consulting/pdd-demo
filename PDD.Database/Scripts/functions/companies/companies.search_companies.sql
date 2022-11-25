CREATE OR REPLACE FUNCTION companies.search_companies(
    _search character varying,
    _countries smallint[],
    _areas smallint[],
    _sort_asc boolean,
    _skip integer,
    _take integer
)
RETURNS json
LANGUAGE plpgsql
AS $$
declare
    _count bigint;
    _companies uuid[];
begin    
    _search = trim(_search);
    
    if _search = '' then
        _search = null;
    end if;
    
    if _search is not null then
        _search = '%' || _search || '%';
    end if;
    
    if array_length(_areas, 1) is not null then
        _companies = (select distinct array_agg(company_id) from company_areas where area_id = any(_areas));
    end if;
    
    create temp table _tmp on commit drop as
    select 
        c.id
    from 
        companies c
    where (
        (_search is null or name ilike _search or company_line ilike _search)
        and
        (array_length(_countries, 1) is null or country = any(_countries))
        and
        (array_length(_companies, 1) is null or id = any(_companies))
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
                    cn.iso2 as countryIso2,
                    cn.name as country,
                    cm.web,
                    cm.twitter,
                    cm.linkedin,
                    coalesce(array_agg(json_build_object('id', ba.id, 'name', ba.name)) filter (where ba.name is not null), array[]::json[]) as areas,
                    reviews.count as reviews,
                    reviews.score
                from 
                    _tmp tmp
                    inner join companies cm on tmp.id = cm.id
                    inner join countries cn on cm.country = cn.code
                    left outer join company_areas ca on cm.id = ca.company_id
                    left outer join business_areas ba on ca.area_id = ba.id
                    join lateral (
                        select 
                            count(id), 
                            avg(score) filter (where score is not null)::numeric(3,2) as score
                        from public.company_reviews
                        where company_id = cm.id
                    ) reviews on true
                group by
                    cm.id, cn.code, reviews.count, reviews.score
                order by 
                    case when _sort_asc is true then cm.name end asc,
                    case when _sort_asc is false then cm.name end desc
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;

COMMENT ON FUNCTION companies.search_companies(_search character varying, _countries smallint[], _areas smallint[], _sort_asc boolean, _skip integer, _take integer) IS 'Search companies by search string (name or company line), or by countries or areas selection.
Result is pageable JSON response `{count, data: [...]}`';
