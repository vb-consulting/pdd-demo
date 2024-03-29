# Dictionary for database `pdd`

- Server: PostgreSQL `localhost:5434`, version `15.0 (Ubuntu 15.0-1.pgdg20.04+1)`
- Local time stamp: `2023-01-16T09:15:53.0252133+01:00`
- Schema's: `public`, `company`, `dashboard`, `companies`
- Schema file: [/PDD.Database/Scripts/schema.sql](/PDD.Database/Scripts/schema.sql)
- Data file: [/PDD.Database/Scripts/data.sql](/PDD.Database/Scripts/data.sql) for tables [business_areas](#table-publicbusiness_areas), [business_roles](#table-publicbusiness_roles), [countries](#table-publiccountries), [users](#table-publicusers), [employee_status](#table-publicemployee_status), [business_role_types](#table-publicbusiness_role_types), [business_areas](#table-publicbusiness_areas), [business_roles](#table-publicbusiness_roles), [countries](#table-publiccountries), [users](#table-publicusers), [employee_status](#table-publicemployee_status), [business_role_types](#table-publicbusiness_role_types)

## Table of Contents

- Table [`public.business_areas`](#table-publicbusiness_areas)
- Table [`public.business_role_types`](#table-publicbusiness_role_types)
- Table [`public.business_roles`](#table-publicbusiness_roles)
- Table [`public.companies`](#table-publiccompanies)
- Table [`public.company_areas`](#table-publiccompany_areas)
- Table [`public.company_reviews`](#table-publiccompany_reviews)
- Table [`public.countries`](#table-publiccountries)
- Table [`public.employee_records`](#table-publicemployee_records)
- Table [`public.employee_status`](#table-publicemployee_status)
- Table [`public.people`](#table-publicpeople)
- Table [`public.person_roles`](#table-publicperson_roles)
- Table [`public.users`](#table-publicusers)
- Enum [`public.valid_genders`](#enum-public-valid_genders)
- Function [`company.company_details(_id uuid)`](#function-companycompany_details_id-uuid)
- Function [`company.company_employees(_id uuid)`](#function-companycompany_employees_id-uuid)
- Function [`company.company_reviews(_id uuid, _skip integer, _take integer)`](#function-companycompany_reviews_id-uuid-_skip-integer-_take-integer)
- Function [`dashboard.chart_companies_by_country(_limit integer)`](#function-dashboardchart_companies_by_country_limit-integer)
- Function [`dashboard.chart_employee_counts_by_area(_limit integer)`](#function-dashboardchart_employee_counts_by_area_limit-integer)
- Function [`dashboard.chart_employee_counts_by_year(_limit integer)`](#function-dashboardchart_employee_counts_by_year_limit-integer)
- Function [`dashboard.top_experinced_people(_limit integer)`](#function-dashboardtop_experinced_people_limit-integer)
- Function [`dashboard.top_rated_companies(_limit integer)`](#function-dashboardtop_rated_companies_limit-integer)
- Function [`companies.business_areas()`](#function-companiesbusiness_areas)
- Function [`companies.search_companies(_search character varying, _countries int2[], _areas int2[], _sort_asc boolean, _skip integer, _take integer)`](#function-companiessearch_companies_search-character-varying-_countries-int2-_areas-int2-_sort_asc-boolean-_skip-integer-_take-integer)
- Function [`companies.search_countries(_search character varying, _skip integer, _take integer)`](#function-companiessearch_countries_search-character-varying-_skip-integer-_take-integer)

## Tables

### Table `public.business_areas`

<!-- comment on table "public"."business_areas" is @until-end-tag; -->

Business areas that companies may be involved.
<!-- end -->
- Count estimate: **-1**
- Source: [/PDD.Database/Scripts/tables/business_areas.sql](/PDD.Database/Scripts/tables/business_areas.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-business_areas-id" href="#public-business_areas-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."business_areas"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_areas-name" href="#public-business_areas-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."business_areas"."name" is @until-end-tag; --><!-- end --> |

- Stats for `public.business_areas`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.business_role_types`

<!-- comment on table "public"."business_role_types" is @until-end-tag; -->

Types or groups of business roles.
<!-- end -->
- Count estimate: **-1**
- Source: [/PDD.Database/Scripts/tables/business_role_types.sql](/PDD.Database/Scripts/tables/business_role_types.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-business_role_types-id" href="#public-business_role_types-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."business_role_types"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_role_types-name" href="#public-business_role_types-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."business_role_types"."name" is @until-end-tag; --><!-- end --> |

- Stats for `public.business_role_types`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.business_roles`

<!-- comment on table "public"."business_roles" is @until-end-tag; -->

Roles in a team that employees are specialized working with.
<!-- end -->
- Count estimate: **-1**
- Source: [/PDD.Database/Scripts/tables/business_roles.sql](/PDD.Database/Scripts/tables/business_roles.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-business_roles-id" href="#public-business_roles-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."business_roles"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_roles-name" href="#public-business_roles-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."business_roles"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_roles-type" href="#public-business_roles-type">#</a>`type` | **FK [➝](#public-business_role_types-id) `business_role_types.id`** | `smallint`| **NO** |  | <!-- comment on column "public"."business_roles"."type" is @until-end-tag; --><!-- end --> |

- Stats for `public.business_roles`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.companies`

<!-- comment on table "public"."companies" is @until-end-tag; -->
<!-- end -->
- Count estimate: **5.000**
- Source: [/PDD.Database/Scripts/tables/companies.sql](/PDD.Database/Scripts/tables/companies.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-companies-id" href="#public-companies-id">#</a>**`id`** | **PK** | `uuid`| **NO** | `gen_random_uuid()` | <!-- comment on column "public"."companies"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-name" href="#public-companies-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."companies"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-web" href="#public-companies-web">#</a>`web` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."web" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-linkedin" href="#public-companies-linkedin">#</a>`linkedin` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."linkedin" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-twitter" href="#public-companies-twitter">#</a>`twitter` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."twitter" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-company_line" href="#public-companies-company_line">#</a>`company_line` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."company_line" is @until-end-tag; -->company moto<!-- end --> |
| <a id="user-content-public-companies-about" href="#public-companies-about">#</a>`about` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."about" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-country" href="#public-companies-country">#</a>`country` | **FK [➝](#public-countries-code) `countries.code`**, **IDX** | `smallint`| **NO** |  | <!-- comment on column "public"."companies"."country" is @until-end-tag; -->headquaters country<!-- end --> |
| <a id="user-content-public-companies-created_at" href="#public-companies-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."companies"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-modified_at" href="#public-companies-modified_at">#</a>`modified_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."companies"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-created_by" href="#public-companies-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."companies"."created_by" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-modified_by" href="#public-companies-modified_by">#</a>`modified_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."companies"."modified_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.companies`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.company_areas`

<!-- comment on table "public"."company_areas" is @until-end-tag; -->

Companies - business areas.
<!-- end -->
- Count estimate: **15.080**
- Source: [/PDD.Database/Scripts/tables/company_areas.sql](/PDD.Database/Scripts/tables/company_areas.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-company_areas-company_id" href="#public-company_areas-company_id">#</a>`company_id` | **IDX** | `uuid`| **NO** |  | <!-- comment on column "public"."company_areas"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-company_id" href="#public-company_areas-company_id">#</a>**`company_id`** | **PK**, **FK [➝](#public-companies-id) `companies.id`** | `uuid`| **NO** |  | <!-- comment on column "public"."company_areas"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-area_id" href="#public-company_areas-area_id">#</a>**`area_id`** | **PK**, **FK [➝](#public-business_areas-id) `business_areas.id`** | `smallint`| **NO** |  | <!-- comment on column "public"."company_areas"."area_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-created_at" href="#public-company_areas-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."company_areas"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-created_by" href="#public-company_areas-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."company_areas"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.company_areas`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.company_reviews`

<!-- comment on table "public"."company_reviews" is @until-end-tag; -->

Company reviews made by people.
<!-- end -->
- Count estimate: **137.415**
- Source: [/PDD.Database/Scripts/tables/company_reviews.sql](/PDD.Database/Scripts/tables/company_reviews.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-company_reviews-id" href="#public-company_reviews-id">#</a>**`id`** | **PK** | `uuid`| **NO** | `gen_random_uuid()` | <!-- comment on column "public"."company_reviews"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_reviews-company_id" href="#public-company_reviews-company_id">#</a>`company_id` | **FK [➝](#public-companies-id) `companies.id`**, **IDX** | `uuid`| **NO** |  | <!-- comment on column "public"."company_reviews"."company_id" is @until-end-tag; -->company reviewed<!-- end --> |
| <a id="user-content-public-company_reviews-person_id" href="#public-company_reviews-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`** | `uuid`| YES |  | <!-- comment on column "public"."company_reviews"."person_id" is @until-end-tag; -->person reviewer<!-- end --> |
| <a id="user-content-public-company_reviews-review" href="#public-company_reviews-review">#</a>`review` | `CHECK (review IS NOT NULL OR score IS NOT NULL)` | `character varying`| YES |  | <!-- comment on column "public"."company_reviews"."review" is @until-end-tag; -->written review by a person<!-- end --> |
| <a id="user-content-public-company_reviews-score" href="#public-company_reviews-score">#</a>`score` | `CHECK (score IS NULL OR score > 0 AND score <= 5)`, `CHECK (review IS NOT NULL OR score IS NOT NULL)` | `smallint`| YES |  | <!-- comment on column "public"."company_reviews"."score" is @until-end-tag; -->score 1-5<!-- end --> |
| <a id="user-content-public-company_reviews-created_at" href="#public-company_reviews-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."company_reviews"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_reviews-modified_at" href="#public-company_reviews-modified_at">#</a>`modified_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."company_reviews"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_reviews-created_by" href="#public-company_reviews-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."company_reviews"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.company_reviews`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.countries`

<!-- comment on table "public"."countries" is @until-end-tag; -->
<!-- end -->
- Count estimate: **249**
- Source: [/PDD.Database/Scripts/tables/countries.sql](/PDD.Database/Scripts/tables/countries.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-countries-code" href="#public-countries-code">#</a>**`code`** | **PK** | `smallint`| **NO** |  | <!-- comment on column "public"."countries"."code" is @until-end-tag; -->Contry ISO 3166 numeric code.<!-- end --> |
| <a id="user-content-public-countries-iso2" href="#public-countries-iso2">#</a>`iso2` | **IDX** | `character(2)`| **NO** |  | <!-- comment on column "public"."countries"."iso2" is @until-end-tag; -->Contry ISO 3166 alpha-2 code.<!-- end --> |
| <a id="user-content-public-countries-iso3" href="#public-countries-iso3">#</a>`iso3` | **IDX** | `character(3)`| **NO** |  | <!-- comment on column "public"."countries"."iso3" is @until-end-tag; -->Contry ISO 3166 alpha-3 code.<!-- end --> |
| <a id="user-content-public-countries-name" href="#public-countries-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."countries"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-culture" href="#public-countries-culture">#</a>`culture` |  | `character varying`| YES |  | <!-- comment on column "public"."countries"."culture" is @until-end-tag; -->The CultureInfo class specifies a unique name for each culture, based on RFC 4646. The name is a combination of an ISO 639 two-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. <!-- end --> |

- Stats for `public.countries`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.employee_records`

<!-- comment on table "public"."employee_records" is @until-end-tag; -->

History of employment in companies by people.
<!-- end -->
- Count estimate: **241.260**
- Source: [/PDD.Database/Scripts/tables/employee_records.sql](/PDD.Database/Scripts/tables/employee_records.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-employee_records-id" href="#public-employee_records-id">#</a>**`id`** | **PK** | `uuid`| **NO** | `gen_random_uuid()` | <!-- comment on column "public"."employee_records"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-company_id" href="#public-employee_records-company_id">#</a>`company_id` | **FK [➝](#public-companies-id) `companies.id`** | `uuid`| **NO** |  | <!-- comment on column "public"."employee_records"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-person_id" href="#public-employee_records-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`**, **IDX** | `uuid`| **NO** |  | <!-- comment on column "public"."employee_records"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-employment_started_at" href="#public-employee_records-employment_started_at">#</a>`employment_started_at` |  | `date`| **NO** |  | <!-- comment on column "public"."employee_records"."employment_started_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-employment_ended_at" href="#public-employee_records-employment_ended_at">#</a>`employment_ended_at` |  | `date`| YES |  | <!-- comment on column "public"."employee_records"."employment_ended_at" is @until-end-tag; -->if this is null, it means person is still working there<!-- end --> |
| <a id="user-content-public-employee_records-created_at" href="#public-employee_records-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."employee_records"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-created_by" href="#public-employee_records-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."employee_records"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.employee_records`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.employee_status`

<!-- comment on table "public"."employee_status" is @until-end-tag; -->

List of possible statuses in regards to employment.
<!-- end -->
- Count estimate: **-1**
- Source: [/PDD.Database/Scripts/tables/employee_status.sql](/PDD.Database/Scripts/tables/employee_status.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-employee_status-id" href="#public-employee_status-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."employee_status"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_status-name" href="#public-employee_status-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."employee_status"."name" is @until-end-tag; --><!-- end --> |

- Stats for `public.employee_status`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.people`

<!-- comment on table "public"."people" is @until-end-tag; -->
<!-- end -->
- Count estimate: **97.994**
- Source: [/PDD.Database/Scripts/tables/people.sql](/PDD.Database/Scripts/tables/people.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-people-id" href="#public-people-id">#</a>**`id`** | **PK** | `uuid`| **NO** | `gen_random_uuid()` | <!-- comment on column "public"."people"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-first_name" href="#public-people-first_name">#</a>`first_name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."people"."first_name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-last_name" href="#public-people-last_name">#</a>`last_name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."people"."last_name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-employee_status" href="#public-people-employee_status">#</a>`employee_status` | **FK [➝](#public-employee_status-id) `employee_status.id`**, **IDX** | `smallint`| YES |  | <!-- comment on column "public"."people"."employee_status" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-gender" href="#public-people-gender">#</a>`gender` | **IDX** | `valid_genders` <sub>user defined `AS ENUM ('M', 'F')` [➝](#enum-public-valid_genders)</sub>| YES |  | <!-- comment on column "public"."people"."gender" is @until-end-tag; -->M or F<!-- end --> |
| <a id="user-content-public-people-email" href="#public-people-email">#</a>`email` |  | `character varying`| YES |  | <!-- comment on column "public"."people"."email" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-linkedin" href="#public-people-linkedin">#</a>`linkedin` |  | `character varying`| YES |  | <!-- comment on column "public"."people"."linkedin" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-twitter" href="#public-people-twitter">#</a>`twitter` |  | `character varying`| YES |  | <!-- comment on column "public"."people"."twitter" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-birth" href="#public-people-birth">#</a>`birth` |  | `date`| YES |  | <!-- comment on column "public"."people"."birth" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-country" href="#public-people-country">#</a>`country` | **FK [➝](#public-countries-code) `countries.code`** | `smallint`| YES |  | <!-- comment on column "public"."people"."country" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-created_at" href="#public-people-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."people"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-modified_at" href="#public-people-modified_at">#</a>`modified_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."people"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-created_by" href="#public-people-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."people"."created_by" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-modified_by" href="#public-people-modified_by">#</a>`modified_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."people"."modified_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.people`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.person_roles`

<!-- comment on table "public"."person_roles" is @until-end-tag; -->

Person - business roles
<!-- end -->
- Count estimate: **255.420**
- Source: [/PDD.Database/Scripts/tables/person_roles.sql](/PDD.Database/Scripts/tables/person_roles.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-person_roles-person_id" href="#public-person_roles-person_id">#</a>`person_id` | **IDX** | `uuid`| **NO** |  | <!-- comment on column "public"."person_roles"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-person_id" href="#public-person_roles-person_id">#</a>**`person_id`** | **PK**, **FK [➝](#public-people-id) `people.id`** | `uuid`| **NO** |  | <!-- comment on column "public"."person_roles"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-role_id" href="#public-person_roles-role_id">#</a>`role_id` | **IDX** | `smallint`| **NO** |  | <!-- comment on column "public"."person_roles"."role_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-role_id" href="#public-person_roles-role_id">#</a>**`role_id`** | **PK**, **FK [➝](#public-business_roles-id) `business_roles.id`** | `smallint`| **NO** |  | <!-- comment on column "public"."person_roles"."role_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-created_at" href="#public-person_roles-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."person_roles"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-created_by" href="#public-person_roles-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `uuid`| **NO** | `'00000000-0000-0000-0000-000000000000'::uuid` | <!-- comment on column "public"."person_roles"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.person_roles`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.users`

<!-- comment on table "public"."users" is @until-end-tag; -->

System users. May or may not be a person (in people records).
<!-- end -->
- Count estimate: **-1**
- Source: [/PDD.Database/Scripts/tables/users.sql](/PDD.Database/Scripts/tables/users.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-users-id" href="#public-users-id">#</a>**`id`** | **PK** | `uuid`| **NO** | `gen_random_uuid()` | <!-- comment on column "public"."users"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-email" href="#public-users-email">#</a>`email` | **IDX** | `character varying`| **NO** |  | <!-- comment on column "public"."users"."email" is @until-end-tag; -->lowercased<!-- end --> |
| <a id="user-content-public-users-name" href="#public-users-name">#</a>`name` |  | `character varying`| YES |  | <!-- comment on column "public"."users"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-data" href="#public-users-data">#</a>`data` |  | `json`| **NO** | `'{}'::json` | <!-- comment on column "public"."users"."data" is @until-end-tag; -->json data received from external auth provider<!-- end --> |
| <a id="user-content-public-users-providers" href="#public-users-providers">#</a>`providers` |  | `character varying[]`| **NO** | `'{}'::character varying[]` | <!-- comment on column "public"."users"."providers" is @until-end-tag; -->list of external auth providers autorized this user<!-- end --> |
| <a id="user-content-public-users-timezone" href="#public-users-timezone">#</a>`timezone` |  | `character varying`| **NO** |  | <!-- comment on column "public"."users"."timezone" is @until-end-tag; -->timezone from browser<!-- end --> |
| <a id="user-content-public-users-culture" href="#public-users-culture">#</a>`culture` |  | `character varying`| **NO** |  | <!-- comment on column "public"."users"."culture" is @until-end-tag; -->matching culture by browser timezone<!-- end --> |
| <a id="user-content-public-users-person_id" href="#public-users-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`** | `uuid`| YES |  | <!-- comment on column "public"."users"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-lockout_end" href="#public-users-lockout_end">#</a>`lockout_end` |  | `timestamp with time zone`| YES |  | <!-- comment on column "public"."users"."lockout_end" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-created_at" href="#public-users-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."users"."created_at" is @until-end-tag; --><!-- end --> |

- Stats for `public.users`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`0`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

## Enums

| Type name | Values | Comment | Source |
| --------- | ------ | --------| ------ |
| <a id="user-content-enum-public-valid_genders" href="#enum-public-valid_genders">#</a>`public.valid_genders` | `'M', 'F'` | <!-- comment on type "public"."valid_genders" is @until-end-tag; -->There are only two genders.<!-- end --> | [/PDD.Database/Scripts/types/valid_genders.sql](/PDD.Database/Scripts/types/valid_genders.sql) |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

## Routines

### Function `company.company_details(_id uuid)`

- Returns `json`

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/company/company.company_details.sql](/PDD.Database/Scripts/functions/company/company.company_details.sql)

- Data Access Code: [/PDD.Database/Extensions/Company/CompanyDetails.cs](/PDD.Database/Extensions/Company/CompanyDetails.cs)

- Unit Tests: [/PDD.DatabaseTests/Company/CompanyDetailsUnitTests.cs](/PDD.DatabaseTests/Company/CompanyDetailsUnitTests.cs)

<!-- comment on function "company"."company_details"(_id uuid) is @until-end-tag; -->
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `company.company_employees(_id uuid)`

- Returns `json`

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/company/company.company_employees.sql](/PDD.Database/Scripts/functions/company/company.company_employees.sql)

- Data Access Code: [/PDD.Database/Extensions/Company/CompanyEmployees.cs](/PDD.Database/Extensions/Company/CompanyEmployees.cs)

- Unit Tests: [/PDD.DatabaseTests/Company/CompanyEmployeesUnitTests.cs](/PDD.DatabaseTests/Company/CompanyEmployeesUnitTests.cs)

<!-- comment on function "company"."company_employees"(_id uuid) is @until-end-tag; -->
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `company.company_reviews(_id uuid, _skip integer, _take integer)`

- Returns `json`

- Language is `plpgsql`

- Source: [/PDD.Database/Scripts/functions/company/company.company_reviews.sql](/PDD.Database/Scripts/functions/company/company.company_reviews.sql)

- Data Access Code: [/PDD.Database/Extensions/Company/CompanyReviews.cs](/PDD.Database/Extensions/Company/CompanyReviews.cs)

- Unit Tests: [/PDD.DatabaseTests/Company/CompanyReviewsUnitTests.cs](/PDD.DatabaseTests/Company/CompanyReviewsUnitTests.cs)

<!-- comment on function "company"."company_reviews"(_id uuid, _skip integer, _take integer) is @until-end-tag; -->
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

## Routines

### Function `dashboard.chart_companies_by_country(_limit integer)`

- Returns `json`

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/dashboard/dashboard.chart_companies_by_country.sql](/PDD.Database/Scripts/functions/dashboard/dashboard.chart_companies_by_country.sql)

- Data Access Code: [/PDD.Database/Extensions/Dashboard/ChartCompaniesByCountry.cs](/PDD.Database/Extensions/Dashboard/ChartCompaniesByCountry.cs)

- Unit Tests: [/PDD.DatabaseTests/Dashboard/ChartCompaniesByCountryUnitTests.cs](/PDD.DatabaseTests/Dashboard/ChartCompaniesByCountryUnitTests.cs)

<!-- comment on function "dashboard"."chart_companies_by_country"(_limit integer) is @until-end-tag; -->
Number of companies by country.
JSON object where labels are country names and it only have one series with the number of companies for each country.
It show only first 9 countries and 10th is summed together as other. 
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `dashboard.chart_employee_counts_by_area(_limit integer)`

- Returns `json`

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/dashboard/dashboard.chart_employee_counts_by_area.sql](/PDD.Database/Scripts/functions/dashboard/dashboard.chart_employee_counts_by_area.sql)

- Data Access Code: [/PDD.Database/Extensions/Dashboard/ChartEmployeeCountsByArea.cs](/PDD.Database/Extensions/Dashboard/ChartEmployeeCountsByArea.cs)

- Unit Tests: [/PDD.DatabaseTests/Dashboard/ChartEmployeeCountsByAreaUnitTests.cs](/PDD.DatabaseTests/Dashboard/ChartEmployeeCountsByAreaUnitTests.cs)

<!-- comment on function "dashboard"."chart_employee_counts_by_area"(_limit integer) is @until-end-tag; -->
Business areas, the number of employees for top 3 companies by highest number of employees.
JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `dashboard.chart_employee_counts_by_year(_limit integer)`

- Returns `json`

- Language is `plpgsql`

- Source: [/PDD.Database/Scripts/functions/dashboard/dashboard.chart_employee_counts_by_year.sql](/PDD.Database/Scripts/functions/dashboard/dashboard.chart_employee_counts_by_year.sql)

- Data Access Code: [/PDD.Database/Extensions/Dashboard/ChartEmployeeCountsByYear.cs](/PDD.Database/Extensions/Dashboard/ChartEmployeeCountsByYear.cs)

- Unit Tests: [/PDD.DatabaseTests/Dashboard/ChartEmployeeCountsByYearUnitTests.cs](/PDD.DatabaseTests/Dashboard/ChartEmployeeCountsByYearUnitTests.cs)

<!-- comment on function "dashboard"."chart_employee_counts_by_year"(_limit integer) is @until-end-tag; -->
Top companies by number of employees for the last ten years.
JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name.
- Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `dashboard.top_experinced_people(_limit integer)`

- Returns `record`

```
RECORD (
  id uuid,
  first_name character varying,
  last_name character varying,
  age integer,
  country character varying,
  countrycode smallint,
  countryiso2 character varying,
  years_of_experience integer,
  number_of_companies bigint,
  employee_status character varying,
  roles character varying[]
)
```

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/dashboard/dashboard.top_experinced_people.sql](/PDD.Database/Scripts/functions/dashboard/dashboard.top_experinced_people.sql)

- Data Access Code: [/PDD.Database/Extensions/Dashboard/TopExperincedPeople.cs](/PDD.Database/Extensions/Dashboard/TopExperincedPeople.cs)

- Unit Tests: [/PDD.DatabaseTests/Dashboard/TopExperincedPeopleUnitTests.cs](/PDD.DatabaseTests/Dashboard/TopExperincedPeopleUnitTests.cs)

<!-- comment on function "dashboard"."top_experinced_people"(_limit integer) is @until-end-tag; -->
Top experienced people by the years of the working experience.
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `dashboard.top_rated_companies(_limit integer)`

- Returns `json`

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/dashboard/dashboard.top_rated_companies.sql](/PDD.Database/Scripts/functions/dashboard/dashboard.top_rated_companies.sql)

- Data Access Code: [/PDD.Database/Extensions/Dashboard/TopRatedCompanies.cs](/PDD.Database/Extensions/Dashboard/TopRatedCompanies.cs)

- Unit Tests: [/PDD.DatabaseTests/Dashboard/TopRatedCompaniesUnitTests.cs](/PDD.DatabaseTests/Dashboard/TopRatedCompaniesUnitTests.cs)

<!-- comment on function "dashboard"."top_rated_companies"(_limit integer) is @until-end-tag; -->
Top rated companies by the user score.
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

## Routines

### Function `companies.business_areas()`

- Returns `record`

```
RECORD (
  value smallint,
  name character varying
)
```

- Language is `sql`

- Source: [/PDD.Database/Scripts/functions/companies/companies.business_areas.sql](/PDD.Database/Scripts/functions/companies/companies.business_areas.sql)

- Data Access Code: [/PDD.Database/Extensions/Companies/BusinessAreas.cs](/PDD.Database/Extensions/Companies/BusinessAreas.cs)

- Unit Tests: [/PDD.DatabaseTests/Companies/BusinessAreasUnitTests.cs](/PDD.DatabaseTests/Companies/BusinessAreasUnitTests.cs)

<!-- comment on function "companies"."business_areas"() is @until-end-tag; -->
select value and name from business_areas
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `companies.search_companies(_search character varying, _countries int2[], _areas int2[], _sort_asc boolean, _skip integer, _take integer)`

- Returns `json`

- Language is `plpgsql`

- Source: [/PDD.Database/Scripts/functions/companies/companies.search_companies.sql](/PDD.Database/Scripts/functions/companies/companies.search_companies.sql)

- Data Access Code: [/PDD.Database/Extensions/Companies/SearchCompanies.cs](/PDD.Database/Extensions/Companies/SearchCompanies.cs)

- Unit Tests: [/PDD.DatabaseTests/Companies/SearchCompaniesUnitTests.cs](/PDD.DatabaseTests/Companies/SearchCompaniesUnitTests.cs)

<!-- comment on function "companies"."search_companies"(_search character varying, _countries int2[], _areas int2[], _sort_asc boolean, _skip integer, _take integer) is @until-end-tag; -->
Search companies by search string (name or company line), or by countries or areas selection.
Result is pageable JSON response `{count, data: [...]}`
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `companies.search_countries(_search character varying, _skip integer, _take integer)`

- Returns `json`

- Language is `plpgsql`

- Source: [/PDD.Database/Scripts/functions/companies/companies.search_countries.sql](/PDD.Database/Scripts/functions/companies/companies.search_countries.sql)

- Data Access Code: [/PDD.Database/Extensions/Companies/SearchCountries.cs](/PDD.Database/Extensions/Companies/SearchCountries.cs)

- Unit Tests: [/PDD.DatabaseTests/Companies/SearchCountriesUnitTests.cs](/PDD.DatabaseTests/Companies/SearchCountriesUnitTests.cs)

<!-- comment on function "companies"."search_countries"(_search character varying, _skip integer, _take integer) is @until-end-tag; -->
Search countries by name or iso2 or iso3.
Result is pageable JSON response `{count, data: [...]}`
Data record has value and name suitable for select type controls.
Countries with companies are sorted first by name, followed by null record (separator) and then by countries without companies sorted by name.
<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>
