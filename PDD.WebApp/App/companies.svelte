<script lang="ts">
    import Layout from "./shared/layout/default";
    import DataGrid from "./shared/components/data-grid.svelte";
    import Pager from "./shared/components/pager.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import Search from "./shared/components/search-input.svelte";
    import Multiselect from "./shared/components/multiselect.svelte";
    import { createTooltips, hideTooltips } from "./shared/components/tooltips";
    import { urls } from "./shared/config";
    import { get, getCached } from "./shared/fetch";
    import { mark } from "./shared/components/utils";
    import { urlToHandle, take, flagBackgroundImageStyle } from "./shared/utils";

    interface ICompanyItem {
        id: string,
        name: string,
        companyline: string,
        about: string,
        countrycode: number,
        countryiso2: string,
        country: string,
        web: string,
        twitter?: string,
        linkedin?: string,
        areas: {id: number, name: string}[],
        reviews: number,
        score: number
    }

    const getCompanies = (grid: IDataGrid) => {
        console.log(countires);
        return get<{
            count: number,
            page: ICompanyItem[]
        }>(urls.companiesSearchUrl, {
            search, 
            countries: countires?.getSelectedKeys() ?? [], 
            areas: areas?.getSelectedKeys() ?? [], 
            skip: grid.skip, 
            take: grid.take
        });
    };
    


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

    let grid: IDataGrid;
    let search = "";

    let countires: IMultiselect<TCountry>;
    const selectedCountires: TCountry[] = [];
    let areas: IMultiselect<IValueName>;
    const selectedAreas: IValueName[] = [];

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
    function areaTokenClick(area: {id: number, name: string}) {
        areas.toggleItem({value: area.id, name: area.name});
    }
    function onSearch() {
        grid.setPage(1);
    }
    function countryTooltip(item: ICompanyItem) {
        return countires.containsKey(item.countrycode) ? `Remove filter by ${item.country}` : `Add filter by ${item.country}`;
    }
    function areaTooltip(area: {id: number, name: string}) {
        return areas.containsKey(area.id) ? `Remove filter by ${area.name}` : `Add filter by ${area.name}`;
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
                    <div slot="token" let:item class="image-15px" style="background-position-y: center; {flagBackgroundImageStyle(item.iso2)};">
                        {item.name}
                    </div>
                    <span slot="option" let:item class="image-15px" style="background-position-y: center; {flagBackgroundImageStyle(item.iso2)};" let:markup>
                        {@html markup}
                        <span class="float-end fs-smaller text-muted">{item.iso3}</span>
                    </span>
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
                <Pager small {grid} class="float-end">
                    <span slot="message">
                        Total <b>{grid.count}</b> companies found. Page <b>{grid.page}</b> of <b>{grid.pageCount}</b>.
                    </span>
                </Pager>
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
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}Company{/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}Web{/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}Areas{/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}About{/if}
                </th>
                <th scope="col">
                    {#if !grid.initialized}<Placeholder height="25px" />{:else}<span class="float-end">Stats</span>{/if}
                </th>
            </tr> 
            <tr slot="placeholderRow">
                <td colspan=99999>
                    <Placeholder height="70vh" />
                </td>
            </tr>
            <tr slot="row" let:data let:grid>
                <td class="" class:text-muted={grid.working}>
                    <div class="fw-bold">{@html mark(data.name, search)}</div>
                    <div class="text-muted">{@html mark(data.companyline, search)}</div>
                    <div class="d-flex mt-1">
                        <button class="clickable-token" 
                            class:selected={countires.containsKey(data.countrycode)}
                            on:click={() => countryTokenClick({code: data.countrycode, iso2: data.countryiso2, name: data.country})}>
                            <div class="image-15px" 
                                style="background-position-y: center;{flagBackgroundImageStyle(data.countryiso2)};" 
                                data-bs-toggle="tooltip" 
                                title={countryTooltip(data)}>
                                {data.country}
                            </div>
                        </button>
                    </div>
                </td>
                <td class="fs-smaller text-nowrap" class:text-muted={grid.working}>
                    {#if data.web}
                        <a class="d-block" href={data.web}><i class="me-1 bi-globe"></i>{data.web}</a>
                    {:else}
                        <div><i class="me-1 bi-globe"></i>-</div>
                    {/if}
                    {#if data.twitter}
                        <a class="d-block" href={data.twitter}><i class="me-1 bi-twitter"></i>{urlToHandle(data.twitter)}</a>
                    {:else}
                        <div class="text-muted"><i class="me-1 bi-twitter"></i>-</div>
                    {/if}
                    {#if data.linkedin}
                        <a class="d-block" href={data.linkedin}><i class="me-1 bi-linkedin"></i>{urlToHandle(data.linkedin)}</a>
                    {:else}
                        <div class="text-muted"><i class="me-1 bi-linkedin"></i>-</div>
                    {/if}
                </td>
                <td class:text-muted={grid.working}>
                    <div class="d-flex flex-wrap">
                        {#each data.areas as area}
                            <button 
                                class="clickable-token mb-1" class:selected={areas.containsKey(area.id)}
                                on:click={() => areaTokenClick(area)}
                                data-bs-toggle="tooltip" 
                                title={areaTooltip(area)}>
                                {area.name}
                            </button>
                        {/each}
                    </div>
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
                <Pager small {grid} class="float-end">
                    <span slot="message">
                        Total <b>{grid.count}</b> companies found. Page <b>{grid.page}</b> of <b>{grid.pageCount}</b>.
                    </span>
                </Pager>
            </div>
        </div>
    </div>
</Layout>

<style lang="scss">
</style>
