<script lang="ts">
    import Layout from "./shared/layout/default";
    import DataGrid from "./shared/components/data-grid.svelte";
    import Pager from "./shared/components/pager.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import Search from "./shared/components/search-input.svelte";
    import Multiselect from "./shared/components/multiselect.svelte";
    import CountryLabel from "./shared/country-label.svelte";
    import CompanyUrl from "./shared/company-url.svelte";
    import Tokens from "./shared/tokens.svelte";
    import { createTooltips, hideTooltips } from "./shared/components/tooltips";
    import { urls } from "./shared/config";
    import { get, getCached } from "./shared/fetch";
    import { mark } from "./shared/components/utils";
    import { urlToHandle, take } from "./shared/utils";

    let grid: IDataGrid;
    let search = "";
    let sortAsc = true;
    let countires: IMultiselect<TCountry>;
    const selectedCountires: TCountry[] = [];
    let areas: IMultiselect<IValueName>;
    const selectedAreas: IValueName[] = [];

    const getCompanies = (grid: IDataGrid) => get<{
            count: number,
            page: ICompanyGridItem[]
        }>(urls.companiesSearchUrl, {
            search, 
            countries: countires?.getSelectedKeys() ?? [], 
            areas: areas?.getSelectedKeys() ?? [], 
            sortAsc,
            skip: grid.skip, 
            take: grid.take
        });
    
    type TCountry = IValueName & {iso2: string, iso3: string};
    const getCountries = (request: IMultiselectRequest) => getCached<IPagedResponse<TCountry>>(urls.companiesCountriesSearchUrl, request);
    
    let cachedAreas: IValueName[];
    const getAreas = async (request: IMultiselectRequest) => {
        if (!cachedAreas) {
            cachedAreas = await getCached<IValueName[]>(urls.businessAreasUrl);
        }
        const lower = request.search.toLowerCase();
        return {
            count: cachedAreas.length,
            page: cachedAreas.filter(a => a.name.toLowerCase().indexOf(lower) > -1)
        };
    };

    const query = new URLSearchParams(window.location.search);
    if (query.has("country")) {
        selectedCountires.push(JSON.parse(query.get("country") as string) as TCountry)
    }
    if (query.has("area")) {
        selectedAreas.push(JSON.parse(query.get("area") as string) as IValueName)
    }

    function countryTokenClick(country: {code: number, iso2: string, name: string}) {
        countires.toggleItem({value: country.code, name: country.name, iso2: country.iso2, iso3: ""})
    }
    function areaTokenClick(area: IToken) {
        areas.toggleItem({value: area.id, name: area.name});
    }
    function onSearch() {
        grid.setPage(1);
    }
    function countryTooltip(item: ICompanyGridItem) {
        return countires.containsKey(item.countrycode) ? `Remove filter by ${item.country}` : `Add filter by ${item.country}`;
    }
    function areaTooltip(area: IToken) {
        return areas.containsKey(area.id) ? `Remove filter by ${area.name}` : `Add filter by ${area.name}`;
    }
    function countryFlag(code: string) {
        return (code ? `background-image: url(https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/${code.toLowerCase()}.svg)` : "")
    }
</script>

<Layout>
    <div class="main container-fluid pt-4">

        <div style="display: grid; grid-template-columns: 60% auto;">
            <div class="filter">

                <Search 
                    placeholder="Search by Company Name or by Company Line" 
                    class="mb-1"
                    bind:value={search} 
                    on:search={onSearch} 
                    searching={grid?.working}
                    initialized={grid?.initialized}>
                </Search>

                <Multiselect
                    class="mb-1"
                    selected={selectedCountires}
                    bind:instance={countires}
                    on:change={onSearch}
                    searchFunc={getCountries} 
                    searchTimeoutMs={0}
                    searching={grid?.working}
                    placeholder="Search Countries"
                    initialized={grid?.initialized}>
                    <div slot="token" let:item class="image-15px" style="background-position-y: center;{countryFlag(item.iso2)}">
                        {item.name}
                    </div>
                    <div slot="option" let:item class="image-15px" style="background-position-y: center;{countryFlag(item.iso2)};" let:markup>
                        {@html markup}
                        <span class="float-end fs-smaller text-muted">{item.iso3}</span>
                    </div>
                </Multiselect>

                <Multiselect
                    selected={selectedAreas}
                    bind:instance={areas}
                    on:change={onSearch}
                    searchFunc={getAreas}
                    searchTimeoutMs={0}
                    searching={grid?.working}
                    placeholder="Search Areas"
                    initialized={grid?.initialized}>
                </Multiselect>

            </div>
            <div style="align-self: end;">
                <Pager small {grid} class="float-end text-end" />
            </div>
        </div>
        <hr />
        <DataGrid 
            hover 
            striped
            bind:instance={grid}
            readBehavior={"onMount"}
            on:render={hideTooltips}
            on:rendered={createTooltips}
            dataPageFunc={getCompanies} 
            take={10}>
            <tr slot="headerRow" let:grid class:text-muted={grid.working && grid.initialized}>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}
                    <span class="header">
                        Company
                    </span>
                    <button class="btn btn-sm btn-outline-primary float-end" 
                        on:click={() => {sortAsc = !sortAsc; grid.setPage(1)}}
                        data-bs-toggle="tooltip" 
                        title={sortAsc ? "Sort by Company Name Descending" : "Sort by Company Name Ascending"}>
                        <i class:bi-arrow-up={!sortAsc} class:bi-arrow-down={sortAsc}></i>
                    </button>
                    {/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}
                    <span class="header">Info</span>
                    {/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}
                    <span class="header">Areas</span>
                    {/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}
                    <span class="header">About</span>
                    {/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}
                    <span class="float-end header">Stats</span>
                    {/if}
                </th>
            </tr> 
            <tr slot="placeholderRow">
                <td colspan=99999>
                    <Placeholder height="70vh" />
                </td>
            </tr>
            <tr slot="row" let:data let:grid>
                <td class="" class:text-muted={grid.working}>
                    <div class="fw-bold">
                        <a href="{urls.companyUrl}/{data.id}">{@html mark(data.name, search)}</a>
                        <button class="btn btn-xsm btn-outline-primary float-end">edit</button>
                    </div>
                    <div class="text-muted">{@html mark(data.companyline, search)}</div>
                </td>
                <td class="fs-smaller text-nowrap" class:text-muted={grid.working}>
                    
                    <CompanyUrl company={data} type="web" />
                    <CompanyUrl company={data} type="twitter" />
                    <CompanyUrl company={data} type="linkedin" />

                    <div class="d-flex mt-1">
                        <button class="clickable-token" disabled={grid.working}
                            class:selected={countires.containsKey(data.countrycode)}
                            on:click={() => countryTokenClick({code: data.countrycode, iso2: data.countryiso2, name: data.country})}>
                            <CountryLabel data={data} tooltip={countryTooltip(data)} />
                        </button>
                    </div>
                </td>
                <td class:text-muted={grid.working}>
                    <Tokens 
                        tokens={data.areas} 
                        disabled={grid.working}
                        selected={token => areas.containsKey(token.id)} 
                        click={areaTokenClick} 
                        tooltip={areaTooltip}
                    />
                </td>
                <td class:text-muted={grid.working}>
                    {take(data.about, 200)}
                </td>
                <td class="fs-smaller text-nowrap">
                    <div class="float-end">
                        <span class="text-muted">Score: </span><span class="font-monospace">{data.score.toFixed(2)}</span>
                    </div>
                    <br />
                    <div class="float-end">
                        <span class="text-muted">Reviews: </span><span class="font-monospace">{data.reviews}</span>
                    </div>
                </td>
            </tr>
            <tr slot="noResultsRow">
                <td colspan=99999 class="text-center">
                    No result
                    <i class="bi bi-emoji-frown"></i>
                </td>
            </tr>
        </DataGrid>
        <div class="mb-5" style="display: grid; grid-template-columns: auto min-content;">
            <div></div>
            <div>
                <Pager small {grid} class="float-end text-end" />
            </div>
        </div>
    </div>
</Layout>

<style lang="scss">
    .header {
        text-decoration: underline;
    }
    .image-15px {
        background-size: 15px;
        background-repeat: no-repeat;
        background-position-x: left;
        background-position-y: 3px;
        padding-left: 18px;
    }
</style>
