# Dictionary for database `pdd`

- Server: PostgreSQL `localhost:5436`, version `14.0`
- Local time stamp: `2022-05-01T14:56:00.8262036+02:00`
- Schema: public

## Table of Contents

- Table [`public.areas`](#table-publicareas)
- Table [`public.companies`](#table-publiccompanies)
- Table [`public.company_areas`](#table-publiccompany_areas)
- Table [`public.countries`](#table-publiccountries)
- Table [`public.employee_records`](#table-publicemployee_records)
- Table [`public.people`](#table-publicpeople)
- Table [`public.users`](#table-publicusers)
## Tables

### Table `public.areas`

<!-- comment on table "public"."areas" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-areas-id" href="#public-areas-id">#</a>`id` | **PK** | `smallint` | **NO** | *auto increment* | <!-- comment on column "public"."areas"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-areas-name" href="#public-areas-name">#</a>`name` |  | `character varying` | **NO** |  | <!-- comment on column "public"."areas"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-areas-name_normalized" href="#public-areas-name_normalized">#</a>`name_normalized` | **IDX** | `character varying` | **NO** |  | <!-- comment on column "public"."areas"."name_normalized" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.companies`

<!-- comment on table "public"."companies" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-companies-id" href="#public-companies-id">#</a>`id` | **PK** | `bigint` | **NO** | *auto increment* | <!-- comment on column "public"."companies"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-name" href="#public-companies-name">#</a>`name` |  | `character varying` | **NO** |  | <!-- comment on column "public"."companies"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-name_normalized" href="#public-companies-name_normalized">#</a>`name_normalized` | **IDX** | `character varying` | **NO** |  | <!-- comment on column "public"."companies"."name_normalized" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-email" href="#public-companies-email">#</a>`email` |  | `character varying` | YES |  | <!-- comment on column "public"."companies"."email" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-linkedin" href="#public-companies-linkedin">#</a>`linkedin` |  | `character varying` | YES |  | <!-- comment on column "public"."companies"."linkedin" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-tweeter" href="#public-companies-tweeter">#</a>`tweeter` |  | `character varying` | YES |  | <!-- comment on column "public"."companies"."tweeter" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-company_line" href="#public-companies-company_line">#</a>`company_line` |  | `character varying` | YES |  | <!-- comment on column "public"."companies"."company_line" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-about" href="#public-companies-about">#</a>`about` |  | `character varying` | YES |  | <!-- comment on column "public"."companies"."about" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-country" href="#public-companies-country">#</a>`country` | **FK [➝](#public-countries-code) `countries.code`** | `smallint` | YES |  | <!-- comment on column "public"."companies"."country" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-created_at" href="#public-companies-created_at">#</a>`created_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."companies"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-modified_at" href="#public-companies-modified_at">#</a>`modified_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."companies"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-created_by" href="#public-companies-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint` | **NO** | `1` | <!-- comment on column "public"."companies"."created_by" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-modified_by" href="#public-companies-modified_by">#</a>`modified_by` | **FK [➝](#public-users-id) `users.id`** | `bigint` | **NO** | `1` | <!-- comment on column "public"."companies"."modified_by" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.company_areas`

<!-- comment on table "public"."company_areas" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-company_areas-company_id" href="#public-company_areas-company_id">#</a>`company_id` | **PK**, **FK [➝](#public-companies-id) `companies.id`** | `bigint` | **NO** |  | <!-- comment on column "public"."company_areas"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-area_id" href="#public-company_areas-area_id">#</a>`area_id` | **PK**, **FK [➝](#public-areas-id) `areas.id`** | `smallint` | **NO** |  | <!-- comment on column "public"."company_areas"."area_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-created_at" href="#public-company_areas-created_at">#</a>`created_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."company_areas"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-created_by" href="#public-company_areas-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint` | **NO** | `1` | <!-- comment on column "public"."company_areas"."created_by" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.countries`

<!-- comment on table "public"."countries" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-countries-code" href="#public-countries-code">#</a>`code` | **PK** | `smallint` | **NO** |  | <!-- comment on column "public"."countries"."code" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-iso2" href="#public-countries-iso2">#</a>`iso2` |  | `character(2)` | **NO** |  | <!-- comment on column "public"."countries"."iso2" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-iso3" href="#public-countries-iso3">#</a>`iso3` |  | `character(3)` | **NO** |  | <!-- comment on column "public"."countries"."iso3" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-name" href="#public-countries-name">#</a>`name` |  | `character varying` | **NO** |  | <!-- comment on column "public"."countries"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-name_normalized" href="#public-countries-name_normalized">#</a>`name_normalized` | **IDX** | `character varying` | **NO** |  | <!-- comment on column "public"."countries"."name_normalized" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-culture" href="#public-countries-culture">#</a>`culture` |  | `character varying` | YES |  | <!-- comment on column "public"."countries"."culture" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.employee_records`

<!-- comment on table "public"."employee_records" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-employee_records-company_id" href="#public-employee_records-company_id">#</a>`company_id` | **FK [➝](#public-companies-id) `companies.id`**, **IDX** | `bigint` | **NO** |  | <!-- comment on column "public"."employee_records"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-person_id" href="#public-employee_records-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`**, **IDX** | `smallint` | **NO** |  | <!-- comment on column "public"."employee_records"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-employment_started_at" href="#public-employee_records-employment_started_at">#</a>`employment_started_at` |  | `date` | **NO** |  | <!-- comment on column "public"."employee_records"."employment_started_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-employment_ended_at" href="#public-employee_records-employment_ended_at">#</a>`employment_ended_at` |  | `date` | YES |  | <!-- comment on column "public"."employee_records"."employment_ended_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-created_at" href="#public-employee_records-created_at">#</a>`created_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."employee_records"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-created_by" href="#public-employee_records-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint` | **NO** | `1` | <!-- comment on column "public"."employee_records"."created_by" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.people`

<!-- comment on table "public"."people" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-people-id" href="#public-people-id">#</a>`id` | **PK** | `bigint` | **NO** | *auto increment* | <!-- comment on column "public"."people"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-first_name" href="#public-people-first_name">#</a>`first_name` |  | `character varying` | **NO** |  | <!-- comment on column "public"."people"."first_name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-last_name" href="#public-people-last_name">#</a>`last_name` |  | `character varying` | **NO** |  | <!-- comment on column "public"."people"."last_name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-name_normalized" href="#public-people-name_normalized">#</a>`name_normalized` | **IDX** | `character varying` | **NO** |  | <!-- comment on column "public"."people"."name_normalized" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-email" href="#public-people-email">#</a>`email` |  | `character varying` | YES |  | <!-- comment on column "public"."people"."email" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-linkedin" href="#public-people-linkedin">#</a>`linkedin` |  | `character varying` | YES |  | <!-- comment on column "public"."people"."linkedin" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-twitter" href="#public-people-twitter">#</a>`twitter` |  | `character varying` | YES |  | <!-- comment on column "public"."people"."twitter" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-phone" href="#public-people-phone">#</a>`phone` |  | `character varying` | YES |  | <!-- comment on column "public"."people"."phone" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-birth" href="#public-people-birth">#</a>`birth` |  | `date` | YES |  | <!-- comment on column "public"."people"."birth" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-country" href="#public-people-country">#</a>`country` | **FK [➝](#public-countries-code) `countries.code`** | `smallint` | YES |  | <!-- comment on column "public"."people"."country" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-created_at" href="#public-people-created_at">#</a>`created_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."people"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-modified_at" href="#public-people-modified_at">#</a>`modified_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."people"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-created_by" href="#public-people-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint` | **NO** | `1` | <!-- comment on column "public"."people"."created_by" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-modified_by" href="#public-people-modified_by">#</a>`modified_by` | **FK [➝](#public-users-id) `users.id`** | `bigint` | **NO** | `1` | <!-- comment on column "public"."people"."modified_by" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.users`

<!-- comment on table "public"."users" is @until-end-tag; -->
<!-- end -->

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| -------- | ------- | ------- |
| <a id="user-content-public-users-id" href="#public-users-id">#</a>`id` | **PK** | `bigint` | **NO** | *auto increment* | <!-- comment on column "public"."users"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-email" href="#public-users-email">#</a>`email` | **IDX** | `character varying` | **NO** |  | <!-- comment on column "public"."users"."email" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-name" href="#public-users-name">#</a>`name` |  | `character varying` | YES |  | <!-- comment on column "public"."users"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-data" href="#public-users-data">#</a>`data` |  | `json` | **NO** | `'{}'::json` | <!-- comment on column "public"."users"."data" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-providers" href="#public-users-providers">#</a>`providers` |  | `ARRAY` | **NO** | `'{}'::character varying[]` | <!-- comment on column "public"."users"."providers" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-timezone" href="#public-users-timezone">#</a>`timezone` |  | `character varying` | **NO** |  | <!-- comment on column "public"."users"."timezone" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-culture" href="#public-users-culture">#</a>`culture` |  | `character varying` | **NO** |  | <!-- comment on column "public"."users"."culture" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-lockout_end" href="#public-users-lockout_end">#</a>`lockout_end` |  | `timestamp with time zone` | YES |  | <!-- comment on column "public"."users"."lockout_end" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-created_at" href="#public-users-created_at">#</a>`created_at` |  | `timestamp with time zone` | **NO** | `now()` | <!-- comment on column "public"."users"."created_at" is @until-end-tag; --><!-- end --> |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>
