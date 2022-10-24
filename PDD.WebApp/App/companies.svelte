<script lang="ts">
    import Layout from "./shared/layout/default";
    import DataGrid from "./shared/components/data-grid.svelte";
    import Pager from "./shared/components/pager.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import { createTooltips, hideTooltips } from "./shared/components/tooltips";
    import { urls } from "./shared/config";
    import { get } from "./shared/fetch";
    import "./shared/extensions.js";

    const getCompanies = (grid: IDataGrid) => get<{
        count: number,
        page: {
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
        }[]
    }>(urls.companiesSearchUrl, {search: "", skip: grid.skip, take: grid.take});

    let grid: IDataGrid;
</script>

<Layout>
    <div class="main container-fluid pt-4">
        <div style="display: grid;grid-template-columns: auto min-content;">
            <div></div>
            <div>
                <Pager {grid} />
            </div>
        </div>
        <DataGrid hover striped
            bind:grid={grid}
            on:render={hideTooltips}
            on:rendered={(e) => {console.log("rendered", e.detail.grid.initialized); createTooltips();}}
            dataPageFunc={getCompanies} 
            take={10}>
            <tr slot="headerRow">
                <th scope="col">
                    Company
                </th>
                <th scope="col">
                    Web
                </th>
                <th scope="col">
                    Areas
                </th>
                <th scope="col" style="width: 500px;">
                    About
                </th>
                <th scope="col">
                    <span class="float-end">Stats</span>
                </th>
            </tr> 
            <tr slot="placeholderRow">
                <td colspan=99999>
                    <Placeholder height="70vh" />
                </td>
            </tr>
            <tr slot="row" let:data let:grid data-bs-toggle="tooltip" title={data.name}>
                <td class="text-nowrap" class:text-muted={grid.working}>
                    <div>{data.name}</div>
                    <div class="fs-smaller text-muted">{data.companyline}</div>
                    <div class="fs-smaller text-muted">
                        <span class="country-flag" style="background-image: url(https://countryflagsapi.com/svg/{data.countrycode});"></span>
                        <span>{data.country}</span>
                    </div>
                </td>
                <td class="fs-smaller text-nowrap" class:text-muted={grid.working}>
                    {#if data.web}
                        <a class="d-block" href={data.web}><i class="thumb bi-globe"></i>{data.web}</a>
                    {:else}
                        <div><i class="thumb bi-globe"></i>-</div>
                    {/if}
                    {#if data.twitter}
                        <a class="d-block" href={data.twitter}><i class="thumb bi-twitter"></i>{data.twitter.urlToHandle()}</a>
                    {:else}
                        <div class="text-muted"><i class="thumb bi-twitter"></i>-</div>
                    {/if}
                    {#if data.linkedin}
                        <a class="d-block" href={data.linkedin}><i class="thumb bi-linkedin"></i>{data.linkedin.urlToHandle()}</a>
                    {:else}
                        <div class="text-muted"><i class="thumb bi-linkedin"></i>-</div>
                    {/if}
                </td>
                <td class:text-muted={grid.working}>
                    {#each data.areas as area}
                        <span class="badge rounded-pill text-bg-secondary grid-badge">{area}</span>
                    {/each}
                </td>
                <td class:text-muted={grid.working}>
                    {data.about.take(200)}
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
            <tr slot="bottomRow" let:grid>
                <td colspan=99999>
                    <div style="display: grid;grid-template-columns: auto min-content;">
                        <div></div>
                        <div>
                            <Pager {grid} />
                        </div>
                    </div>
                </td>
            </tr>
        </DataGrid>

    </div>
</Layout>

<style lang="scss">
</style>
