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
    import { mark } from "./shared/components/strings";
    import { urlToHandle, take, flagUrl } from "./shared/strings";

    interface ICompanyItem {
        id: string,
        name: string,
        companyline: string,
        about: string,
        countrycode: number,
        country: string,
        web: string,
        twitter?: string,
        linkedin?: string,
        areas: string[],
        reviews: number,
        score: number
    }

    const getCompanies = (grid: IDataGrid) => get<{
        count: number,
        page: ICompanyItem[]
    }>(urls.companiesSearchUrl, {search, skip: grid.skip, take: grid.take});

    const getCountries = (request: IMultiselectRequest) => getCached<IMultiselectResponse>(urls.countriesSearchUrl, request);


    let grid: IDataGrid;
    let search = "";

    const rowTooltip = (data: ICompanyItem) => `
    <div class="text-start">
        ${data.name}
        <div class="text-muted">
            ${data.companyline}
        </div>
        <div class="fs-smaller text-muted">
            ${data.country}
        </div>
    </div>`;

    function onsearch() {
        grid.setPage(1);
    }

    let selectedCountires: IValueName[];

    $: {
        //console.log(selectedCountires?.map(c => c.value));
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
                    on:search={onsearch} 
                    searching={grid?.working}
                    initialized={grid?.initialized} />

                    <Multiselect
                        bind:selected={selectedCountires}
                        searchFunc={getCountries} 
                        searchTimeoutMs={0}
                        searching={grid?.working}
                        placeholder="Search Countries"
                        initialized={grid?.initialized}>
                        <div slot="token" let:item class="image-15px" style="background-position-y: center; background-image: url({flagUrl(item.value)});">
                            {item.name}
                        </div>
                        <span slot="option" let:item class="image-15px" style="background-position-y: center; background-image: url({flagUrl(item.value)});" let:markup>
                            {@html markup}
                        </span>
                    </Multiselect>
            </div>
            <div style="align-self: end;">
                <Pager small {grid} class="float-end" />
            </div>
        </div>
        <hr />
        <DataGrid 
            hover 
            striped
            bind:grid={grid}
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
            <tr slot="row" let:data let:grid data-bs-toggle="tooltip" data-bs-html="true" title={rowTooltip(data)}>
                <td class="" class:text-muted={grid.working}>
                    <div>{@html mark(data.name, search)}</div>
                    <div class="text-muted">{@html mark(data.companyline, search)}</div>
                    <div class="fs-smaller text-muted image-15px" style="background-position-y: center; background-image: url({flagUrl(data.countrycode)});" data-bs-toggle="tooltip" title={data.country}>
                        {data.country}
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
                    {#each data.areas as area}
                        <span class="badge rounded-pill text-bg-secondary ms-1 mb-1">{area}</span>
                    {/each}
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
                <Pager small {grid} class="float-end" />
            </div>
        </div>
    </div>
</Layout>

<style lang="scss">
</style>
