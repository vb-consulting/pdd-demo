CREATE OR REPLACE FUNCTION companies.company_details(
    _id uuid
)
RETURNS json
LANGUAGE sql
AS $$
select row_to_json(row)
from (
    select
        a.id,
        a.name,
        a.web,
        a.linkedin,
        a.twitter,
        a.company_line as companyLine,
        a.about,
        a.country as countryCode,
        b.iso2 as countryIso2,
        b.name as country,
        coalesce(array_agg(json_build_object('id', f.id, 'name',f.name)) filter (where f.name is not null), array[]::json[]) as areas,
        a.created_at as createdAt,
        c.name as createdBy,
        a.modified_at as modifiedAt,
        d.name as modifiedBy
    from
        companies a
        inner join countries b on a.country = b.code
        inner join users c on a.created_by = c.id
        inner join users d on a.modified_by = d.id
        left outer join company_areas e on a.id = e.company_id
        left outer join business_areas f on e.area_id = f.id
    where
        a.id = _id
    group by
        a.id, b.iso2, b.name, c.name, d.name
) row
$$;
