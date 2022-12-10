CREATE OR REPLACE FUNCTION company.company_reviews(
    _id uuid,
    _skip integer,
    _take integer
)
RETURNS json
LANGUAGE plpgsql
AS $$
declare
    _count bigint;
begin
    create temp table _tmp on commit drop as
    select 
        c.id
    from 
        company_reviews c
    where (
        company_id = _id
    );
    get diagnostics _count = row_count;
    
    return json_build_object(
        'count', _count,
        'page', (
            select coalesce(json_agg(sub), '[]'::json)
            from ( 
                 select 
                    a.person_id as personId,
                    b.first_name as firstName,
                    b.last_name  as lastName,
                    a.review,
                    a.score,
                    a.modified_at as at
                from 
                    company_reviews a
                    inner join people b on a.person_id = b.id
                where 
                    company_id = _id
                order by 
                    a.modified_at desc
                limit _take 
                offset _skip
            ) sub
        )
    );
end
$$;
