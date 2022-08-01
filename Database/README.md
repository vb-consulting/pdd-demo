# Dictionary for database `pdd`

- Server: PostgreSQL `localhost:5436`, version `14.0`
- Local time stamp: `2022-08-01T13:20:09.5354340+02:00`
- Schema's: `public`, `reporting`
- Schema file: [/Database/Scripts/schema.sql](/Database/Scripts/schema.sql)
- Data file: [/Database/Scripts/data.sql](/Database/Scripts/data.sql) for tables [business_areas](#table-publicbusiness_areas), [business_roles](#table-publicbusiness_roles), [countries](#table-publiccountries), [users](#table-publicusers), [employee_status](#table-publicemployee_status), [business_role_types](#table-publicbusiness_role_types), [business_areas](#table-publicbusiness_areas), [business_roles](#table-publicbusiness_roles), [countries](#table-publiccountries), [users](#table-publicusers), [employee_status](#table-publicemployee_status), [business_role_types](#table-publicbusiness_role_types)

## Table of Contents

- Function [`reporting.chart_1()`](#function-reportingchart_1)
- Function [`reporting.chart_2()`](#function-reportingchart_2)
- Function [`reporting.chart_3()`](#function-reportingchart_3)
- Function [`reporting.chart_4()`](#function-reportingchart_4)
- Function [`reporting.chart_5()`](#function-reportingchart_5)
- Function [`reporting.chart_6()`](#function-reportingchart_6)
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

## Routines

### Function `reporting.chart_1()`

- Returns `json`

- Language is `sql`

- Source: [/Database/Scripts/functions/reporting/reporting.chart_1.sql](/Database/Scripts/functions/reporting/reporting.chart_1.sql)

- C# Source: [/Database/Extensions/Chart1.cs](/Database/Extensions/Chart1.cs)

<!-- comment on function "reporting"."chart_1"() is @until-end-tag; -->
Top 10 comapnies by number of current employees.
Json object where lables are companies name with average score included and it only have one series with the number of current employees for each company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `reporting.chart_2()`

- Returns `json`

- Language is `plpgsql`

- Source: [/Database/Scripts/functions/reporting/reporting.chart_2.sql](/Database/Scripts/functions/reporting/reporting.chart_2.sql)

- C# Source: [/Database/Extensions/Chart2.cs](/Database/Extensions/Chart2.cs)

<!-- comment on function "reporting"."chart_2"() is @until-end-tag; -->
Top 5 comapnies by number of employees for the last ten years.
Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
- Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `reporting.chart_3()`

- Returns `json`

- Language is `sql`

- Source: [/Database/Scripts/functions/reporting/reporting.chart_3.sql](/Database/Scripts/functions/reporting/reporting.chart_3.sql)

- C# Source: [/Database/Extensions/Chart3.cs](/Database/Extensions/Chart3.cs)

<!-- comment on function "reporting"."chart_3"() is @until-end-tag; -->
Number of companies by business area.
Json object where lables are companies name and it only have one series with the number of business area for each company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `reporting.chart_4()`

- Returns `json`

- Language is `sql`

- Source: [/Database/Scripts/functions/reporting/reporting.chart_4.sql](/Database/Scripts/functions/reporting/reporting.chart_4.sql)

- C# Source: [/Database/Extensions/Chart4.cs](/Database/Extensions/Chart4.cs)

<!-- comment on function "reporting"."chart_4"() is @until-end-tag; -->
Number of companies by country.
Json object where lables are country names and it only have one series with the number of companies for each country.
It show only first 9 conutries and 10th is summed together as other. 
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `reporting.chart_5()`

- Returns `json`

- Language is `sql`

- Source: [/Database/Scripts/functions/reporting/reporting.chart_5.sql](/Database/Scripts/functions/reporting/reporting.chart_5.sql)

- C# Source: [/Database/Extensions/Chart5.cs](/Database/Extensions/Chart5.cs)

<!-- comment on function "reporting"."chart_5"() is @until-end-tag; -->
Top 10 comanies with highest number of user reviews.
Json object where lables are companies names with average score and it only have one series with total number of reviews.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Function `reporting.chart_6()`

- Returns `json`

- Language is `sql`

- Source: [/Database/Scripts/functions/reporting/reporting.chart_6.sql](/Database/Scripts/functions/reporting/reporting.chart_6.sql)

- C# Source: [/Database/Extensions/Chart6.cs](/Database/Extensions/Chart6.cs)

<!-- comment on function "reporting"."chart_6"() is @until-end-tag; -->
Business areas, the number of employees for top 3 companies by highest number of employees.
Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
- Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`

<!-- end -->

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>
## Tables

### Table `public.business_areas`

<!-- comment on table "public"."business_areas" is @until-end-tag; -->
Business areas that companies may be invloved.
<!-- end -->
- Count estimate: ****
- Source: [/Database/Scripts/tables/business_areas.sql](/Database/Scripts/tables/business_areas.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-business_areas-id" href="#public-business_areas-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."business_areas"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_areas-name" href="#public-business_areas-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."business_areas"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_areas-name_normalized" href="#public-business_areas-name_normalized">#</a>`name_normalized` | **IDX** | `character varying`| **NO** | `GENERATED ALWAYS AS lower((name)::text)` | <!-- comment on column "public"."business_areas"."name_normalized" is @until-end-tag; -->lowercased<!-- end --> |

- Stats for `public.business_areas`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`2`** | count=**`0`** | inserted=**`91`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`13`**, dead=**`0`** | last auto=**`2022-08-01 11:19:33Z`**, rows inserted since=**`13`** | last auto=, rows updated since=**`13`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.business_role_types`

<!-- comment on table "public"."business_role_types" is @until-end-tag; -->
Types or groups of business roles.
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/business_role_types.sql](/Database/Scripts/tables/business_role_types.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-business_role_types-id" href="#public-business_role_types-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."business_role_types"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_role_types-name" href="#public-business_role_types-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."business_role_types"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_role_types-name_normalized" href="#public-business_role_types-name_normalized">#</a>`name_normalized` | **IDX** | `character varying`| **NO** | `GENERATED ALWAYS AS lower((name)::text)` | <!-- comment on column "public"."business_role_types"."name_normalized" is @until-end-tag; -->lowercased<!-- end --> |

- Stats for `public.business_role_types`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`2`** | count=**`126`** | inserted=**`42`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`126`** | live=**`6`**, dead=**`36`** | last auto=, rows inserted since=**`42`** | last auto=, rows updated since=**`6`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.business_roles`

<!-- comment on table "public"."business_roles" is @until-end-tag; -->
Roles in a team that employees are specialized working with.
<!-- end -->
- Count estimate: ****
- Source: [/Database/Scripts/tables/business_roles.sql](/Database/Scripts/tables/business_roles.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-business_roles-id" href="#public-business_roles-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."business_roles"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_roles-name" href="#public-business_roles-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."business_roles"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-business_roles-name_normalized" href="#public-business_roles-name_normalized">#</a>`name_normalized` | **IDX** | `character varying`| **NO** | `GENERATED ALWAYS AS lower((name)::text)` | <!-- comment on column "public"."business_roles"."name_normalized" is @until-end-tag; -->lowercased<!-- end --> |
| <a id="user-content-public-business_roles-type" href="#public-business_roles-type">#</a>`type` | **FK [➝](#public-business_role_types-id) `business_role_types.id`** | `smallint`| **NO** |  | <!-- comment on column "public"."business_roles"."type" is @until-end-tag; --><!-- end --> |

- Stats for `public.business_roles`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`3`** | count=**`0`** | inserted=**`126`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`18`**, dead=**`0`** | last auto=**`2022-08-01 11:19:33Z`**, rows inserted since=**`18`** | last auto=, rows updated since=**`18`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.companies`

<!-- comment on table "public"."companies" is @until-end-tag; -->
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/companies.sql](/Database/Scripts/tables/companies.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-companies-id" href="#public-companies-id">#</a>**`id`** | **PK** | `bigint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."companies"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-name" href="#public-companies-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."companies"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-name_normalized" href="#public-companies-name_normalized">#</a>`name_normalized` | **IDX**, UNIQUE | `character varying`| **NO** | `GENERATED ALWAYS AS lower((name)::text)` | <!-- comment on column "public"."companies"."name_normalized" is @until-end-tag; -->lowercased, trigram index<!-- end --> |
| <a id="user-content-public-companies-web" href="#public-companies-web">#</a>`web` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."web" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-linkedin" href="#public-companies-linkedin">#</a>`linkedin` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."linkedin" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-tweeter" href="#public-companies-tweeter">#</a>`tweeter` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."tweeter" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-company_line" href="#public-companies-company_line">#</a>`company_line` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."company_line" is @until-end-tag; -->company moto<!-- end --> |
| <a id="user-content-public-companies-about" href="#public-companies-about">#</a>`about` |  | `character varying`| YES |  | <!-- comment on column "public"."companies"."about" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-country" href="#public-companies-country">#</a>`country` | **FK [➝](#public-countries-code) `countries.code`**, **IDX** | `smallint`| YES |  | <!-- comment on column "public"."companies"."country" is @until-end-tag; -->headquaters country<!-- end --> |
| <a id="user-content-public-companies-created_at" href="#public-companies-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."companies"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-modified_at" href="#public-companies-modified_at">#</a>`modified_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."companies"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-created_by" href="#public-companies-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."companies"."created_by" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-companies-modified_by" href="#public-companies-modified_by">#</a>`modified_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."companies"."modified_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.companies`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`7`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.company_areas`

<!-- comment on table "public"."company_areas" is @until-end-tag; -->
Companies - business areas.
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/company_areas.sql](/Database/Scripts/tables/company_areas.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-company_areas-company_id" href="#public-company_areas-company_id">#</a>`company_id` | **FK [➝](#public-companies-id) `companies.id`**, **IDX** | `bigint`| **NO** |  | <!-- comment on column "public"."company_areas"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-company_id" href="#public-company_areas-company_id">#</a>**`company_id`** | **PK** | `bigint`| **NO** |  | <!-- comment on column "public"."company_areas"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-area_id" href="#public-company_areas-area_id">#</a>`area_id` | **FK [➝](#public-business_areas-id) `business_areas.id`** | `smallint`| **NO** |  | <!-- comment on column "public"."company_areas"."area_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-area_id" href="#public-company_areas-area_id">#</a>**`area_id`** | **PK** | `smallint`| **NO** |  | <!-- comment on column "public"."company_areas"."area_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-created_at" href="#public-company_areas-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."company_areas"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_areas-created_by" href="#public-company_areas-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."company_areas"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.company_areas`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`5`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.company_reviews`

<!-- comment on table "public"."company_reviews" is @until-end-tag; -->
Company reviews made by people.
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/company_reviews.sql](/Database/Scripts/tables/company_reviews.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-company_reviews-id" href="#public-company_reviews-id">#</a>**`id`** | **PK** | `bigint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."company_reviews"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_reviews-company_id" href="#public-company_reviews-company_id">#</a>`company_id` | **FK [➝](#public-companies-id) `companies.id`**, **IDX** | `bigint`| **NO** |  | <!-- comment on column "public"."company_reviews"."company_id" is @until-end-tag; -->company reviewed<!-- end --> |
| <a id="user-content-public-company_reviews-person_id" href="#public-company_reviews-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`** | `bigint`| YES |  | <!-- comment on column "public"."company_reviews"."person_id" is @until-end-tag; -->person reviewer<!-- end --> |
| <a id="user-content-public-company_reviews-review" href="#public-company_reviews-review">#</a>`review` |  | `character varying`| **NO** |  | <!-- comment on column "public"."company_reviews"."review" is @until-end-tag; -->written review by a person<!-- end --> |
| <a id="user-content-public-company_reviews-score" href="#public-company_reviews-score">#</a>`score` | `CHECK (score IS NULL OR score > 0 AND score <= 5)` | `smallint`| YES |  | <!-- comment on column "public"."company_reviews"."score" is @until-end-tag; -->score 1-5<!-- end --> |
| <a id="user-content-public-company_reviews-created_at" href="#public-company_reviews-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."company_reviews"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_reviews-modified_at" href="#public-company_reviews-modified_at">#</a>`modified_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."company_reviews"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-company_reviews-created_by" href="#public-company_reviews-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."company_reviews"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.company_reviews`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`5`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.countries`

<!-- comment on table "public"."countries" is @until-end-tag; -->
<!-- end -->
- Count estimate: ****
- Source: [/Database/Scripts/tables/countries.sql](/Database/Scripts/tables/countries.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-countries-code" href="#public-countries-code">#</a>**`code`** | **PK** | `smallint`| **NO** |  | <!-- comment on column "public"."countries"."code" is @until-end-tag; -->Contry ISO 3166 numeric code.<!-- end --> |
| <a id="user-content-public-countries-iso2" href="#public-countries-iso2">#</a>`iso2` | **IDX** | `character(2)`| **NO** |  | <!-- comment on column "public"."countries"."iso2" is @until-end-tag; -->Contry ISO 3166 alpha-2 code.<!-- end --> |
| <a id="user-content-public-countries-iso3" href="#public-countries-iso3">#</a>`iso3` | **IDX** | `character(3)`| **NO** |  | <!-- comment on column "public"."countries"."iso3" is @until-end-tag; -->Contry ISO 3166 alpha-3 code.<!-- end --> |
| <a id="user-content-public-countries-name" href="#public-countries-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."countries"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-countries-name_normalized" href="#public-countries-name_normalized">#</a>`name_normalized` | **IDX** | `character varying`| **NO** | `GENERATED ALWAYS AS lower((name)::text)` | <!-- comment on column "public"."countries"."name_normalized" is @until-end-tag; -->lowercased<!-- end --> |
| <a id="user-content-public-countries-culture" href="#public-countries-culture">#</a>`culture` |  | `character varying`| YES |  | <!-- comment on column "public"."countries"."culture" is @until-end-tag; -->The CultureInfo class specifies a unique name for each culture, based on RFC 4646. The name is a combination of an ISO 639 two-letter lowercase culture code associated with a language and an ISO 3166 two-letter uppercase subculture code associated with a country or region. <!-- end --> |

- Stats for `public.countries`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`4`** | count=**`0`** | inserted=**`751`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`249`**, dead=**`0`** | last auto=**`2022-08-01 11:19:33Z`**, rows inserted since=**`249`** | last auto=, rows updated since=**`249`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.employee_records`

<!-- comment on table "public"."employee_records" is @until-end-tag; -->
History of employment in companies by people.
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/employee_records.sql](/Database/Scripts/tables/employee_records.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-employee_records-id" href="#public-employee_records-id">#</a>**`id`** | **PK** | `bigint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."employee_records"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-company_id" href="#public-employee_records-company_id">#</a>`company_id` | **FK [➝](#public-companies-id) `companies.id`** | `bigint`| **NO** |  | <!-- comment on column "public"."employee_records"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-company_id" href="#public-employee_records-company_id">#</a>**`company_id`** | **PK** | `bigint`| **NO** |  | <!-- comment on column "public"."employee_records"."company_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-person_id" href="#public-employee_records-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`**, **IDX** | `bigint`| **NO** |  | <!-- comment on column "public"."employee_records"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-employment_started_at" href="#public-employee_records-employment_started_at">#</a>`employment_started_at` |  | `date`| **NO** |  | <!-- comment on column "public"."employee_records"."employment_started_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-employment_ended_at" href="#public-employee_records-employment_ended_at">#</a>`employment_ended_at` |  | `date`| YES |  | <!-- comment on column "public"."employee_records"."employment_ended_at" is @until-end-tag; -->if this is null, it means person is still working there<!-- end --> |
| <a id="user-content-public-employee_records-created_at" href="#public-employee_records-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."employee_records"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_records-created_by" href="#public-employee_records-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."employee_records"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.employee_records`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`5`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.employee_status`

<!-- comment on table "public"."employee_status" is @until-end-tag; -->
List of possible statuses in regards to employment.
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/employee_status.sql](/Database/Scripts/tables/employee_status.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-employee_status-id" href="#public-employee_status-id">#</a>**`id`** | **PK** | `smallint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."employee_status"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_status-name" href="#public-employee_status-name">#</a>`name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."employee_status"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-employee_status-name_normalized" href="#public-employee_status-name_normalized">#</a>`name_normalized` | **IDX** | `character varying`| **NO** | `GENERATED ALWAYS AS lower((name)::text)` | <!-- comment on column "public"."employee_status"."name_normalized" is @until-end-tag; -->lowercased<!-- end --> |

- Stats for `public.employee_status`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`2`** | count=**`0`** | inserted=**`6`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`6`**, dead=**`0`** | last auto=, rows inserted since=**`6`** | last auto=, rows updated since=**`6`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.people`

<!-- comment on table "public"."people" is @until-end-tag; -->
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/people.sql](/Database/Scripts/tables/people.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-people-id" href="#public-people-id">#</a>**`id`** | **PK** | `bigint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."people"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-first_name" href="#public-people-first_name">#</a>`first_name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."people"."first_name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-last_name" href="#public-people-last_name">#</a>`last_name` |  | `character varying`| **NO** |  | <!-- comment on column "public"."people"."last_name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-name_normalized" href="#public-people-name_normalized">#</a>`name_normalized` | **IDX** | `character varying`| **NO** | `GENERATED ALWAYS AS ((lower((first_name)::text) || ' '::text) || lower((last_name)::text))` | <!-- comment on column "public"."people"."name_normalized" is @until-end-tag; -->first namer + last name, trigram index<!-- end --> |
| <a id="user-content-public-people-employee_status" href="#public-people-employee_status">#</a>`employee_status` | **FK [➝](#public-employee_status-id) `employee_status.id`**, **IDX** | `smallint`| **NO** |  | <!-- comment on column "public"."people"."employee_status" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-gender" href="#public-people-gender">#</a>`gender` | **IDX** | `valid_genders` <sub>user definded `AS ENUM ('M', 'F')` [➝](#enum-public-valid_genders)</sub>| YES |  | <!-- comment on column "public"."people"."gender" is @until-end-tag; -->M or F<!-- end --> |
| <a id="user-content-public-people-email" href="#public-people-email">#</a>`email` |  | `character varying`| YES |  | <!-- comment on column "public"."people"."email" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-linkedin" href="#public-people-linkedin">#</a>`linkedin` |  | `character varying`| YES |  | <!-- comment on column "public"."people"."linkedin" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-twitter" href="#public-people-twitter">#</a>`twitter` |  | `character varying`| YES |  | <!-- comment on column "public"."people"."twitter" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-birth" href="#public-people-birth">#</a>`birth` |  | `date`| YES |  | <!-- comment on column "public"."people"."birth" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-country" href="#public-people-country">#</a>`country` | **FK [➝](#public-countries-code) `countries.code`** | `smallint`| YES |  | <!-- comment on column "public"."people"."country" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-created_at" href="#public-people-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."people"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-modified_at" href="#public-people-modified_at">#</a>`modified_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."people"."modified_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-created_by" href="#public-people-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."people"."created_by" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-people-modified_by" href="#public-people-modified_by">#</a>`modified_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."people"."modified_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.people`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`8`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.person_roles`

<!-- comment on table "public"."person_roles" is @until-end-tag; -->
Person - business roles
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/person_roles.sql](/Database/Scripts/tables/person_roles.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-person_roles-person_id" href="#public-person_roles-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`**, **IDX** | `bigint`| **NO** |  | <!-- comment on column "public"."person_roles"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-person_id" href="#public-person_roles-person_id">#</a>**`person_id`** | **PK** | `bigint`| **NO** |  | <!-- comment on column "public"."person_roles"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-role_id" href="#public-person_roles-role_id">#</a>`role_id` | **FK [➝](#public-business_roles-id) `business_roles.id`**, **IDX** | `smallint`| **NO** |  | <!-- comment on column "public"."person_roles"."role_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-role_id" href="#public-person_roles-role_id">#</a>**`role_id`** | **PK** | `smallint`| **NO** |  | <!-- comment on column "public"."person_roles"."role_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-created_at" href="#public-person_roles-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."person_roles"."created_at" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-person_roles-created_by" href="#public-person_roles-created_by">#</a>`created_by` | **FK [➝](#public-users-id) `users.id`** | `bigint`| **NO** | `1` | <!-- comment on column "public"."person_roles"."created_by" is @until-end-tag; --><!-- end --> |

- Stats for `public.person_roles`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`6`** | count=**`0`** | inserted=**`0`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`0`**, dead=**`0`** | last auto=, rows inserted since=**`0`** | last auto=, rows updated since=**`0`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

### Table `public.users`

<!-- comment on table "public"."users" is @until-end-tag; -->
System users. May or may not be a person (in people records).
<!-- end -->
- Count estimate: **-1**
- Source: [/Database/Scripts/tables/users.sql](/Database/Scripts/tables/users.sql)

| Column |             | Type | Nullable | Default | Comment |
| ------ | ----------- | -----| :------: | ------- | ------- |
| <a id="user-content-public-users-id" href="#public-users-id">#</a>**`id`** | **PK** | `bigint`| **NO** | `GENERATED ALWAYS AS IDENTITY` | <!-- comment on column "public"."users"."id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-email" href="#public-users-email">#</a>`email` | **IDX** | `character varying`| **NO** |  | <!-- comment on column "public"."users"."email" is @until-end-tag; -->lowercased<!-- end --> |
| <a id="user-content-public-users-name" href="#public-users-name">#</a>`name` |  | `character varying`| YES |  | <!-- comment on column "public"."users"."name" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-data" href="#public-users-data">#</a>`data` |  | `json`| **NO** | `'{}'::json` | <!-- comment on column "public"."users"."data" is @until-end-tag; -->json data received from external auth provider<!-- end --> |
| <a id="user-content-public-users-providers" href="#public-users-providers">#</a>`providers` |  | `ARRAY`| **NO** | `'{}'::character varying[]` | <!-- comment on column "public"."users"."providers" is @until-end-tag; -->list of external auth providers autorized this user<!-- end --> |
| <a id="user-content-public-users-timezone" href="#public-users-timezone">#</a>`timezone` |  | `character varying`| **NO** |  | <!-- comment on column "public"."users"."timezone" is @until-end-tag; -->timezone from browser<!-- end --> |
| <a id="user-content-public-users-culture" href="#public-users-culture">#</a>`culture` |  | `character varying`| **NO** |  | <!-- comment on column "public"."users"."culture" is @until-end-tag; -->matching culture by browser timezone<!-- end --> |
| <a id="user-content-public-users-person_id" href="#public-users-person_id">#</a>`person_id` | **FK [➝](#public-people-id) `people.id`** | `bigint`| YES |  | <!-- comment on column "public"."users"."person_id" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-lockout_end" href="#public-users-lockout_end">#</a>`lockout_end` |  | `timestamp with time zone`| YES |  | <!-- comment on column "public"."users"."lockout_end" is @until-end-tag; --><!-- end --> |
| <a id="user-content-public-users-created_at" href="#public-users-created_at">#</a>`created_at` |  | `timestamp with time zone`| **NO** | `now()` | <!-- comment on column "public"."users"."created_at" is @until-end-tag; --><!-- end --> |

- Stats for `public.users`:

| **Sequence Scan** | **Index Scan** | **Rows** | **Vaccum** | **Analyze** |
| ----------------- | -------------- | -------- | ---------- | ----------- |
| count=**`3`** | count=**`0`** | inserted=**`2`**, updated=**`0`**, deleted=**`0`** | last=, count=**`0`** | last=, count=**`0`** |
| rows=**`0`** | rows=**`0`** | live=**`1`**, dead=**`1`** | last auto=, rows inserted since=**`2`** | last auto=, rows updated since=**`1`** |


<a href="#table-of-contents" title="Table of Contents">&#8673;</a>

## Enums
| Type name | Values | Comment | Source |
| --------- | ------ | --------| ------ |
| <a id="user-content-enum-public-valid_genders" href="#enum-public-valid_genders">#</a>`valid_genders` | `'M', 'F'` | <!-- comment on type "public"."valid_genders" is @until-end-tag; -->There are only two genders.<!-- end --> | [/Database/Scripts/types/valid_genders.sql](/Database/Scripts/types/valid_genders.sql) |

<a href="#table-of-contents" title="Table of Contents">&#8673;</a>
