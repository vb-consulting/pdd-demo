<script lang="ts">
    import Layout from "./shared/layout/default";
    import ChartBox from "./shared/components/chart-box.svelte";
    import DataGrid from "./shared/components/data-grid.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import { urls } from "./shared/config";
    import { get } from "./shared/fetch";
    import { flagUrl } from "./shared/utils";

    const getTopCompanies = () => get<{
        id: string;
        name: string;
        companyLine: string;
        country: string;
        countryCode: number;
        areas: string[];
        score: number;
        reviews: number;
    }[]>(urls.topRatedCompaniesUrl);

    const getTopEmployees = () => get<{
        id: string;
        firstName: string;
        lastName: string;
        country: string;
        countryCode: number;
        yearsOfExperience: number;
        numberOfCompanies: number;
        employeeStatus: string;
        roles: string[];
    }[]>(urls.topExperincedPeopleUrl);

</script>

<Layout>

    <div class="main container-fluid pt-4">
        
        <div class="row chart-row border-bottom">
            <div class="col-md-4 chart">
                <ChartBox 
                    type="pie" 
                    dataFunc={() => get(urls.chartCompaniesByCountryUrl)}
                    minHeight="300px"
                    displayLegend={true}
                    title="Top 10 companies by the country" />
            </div>
            <div class="col-md-4">
                <ChartBox 
                    type="bar" 
                    dataFunc={() => get(urls.chartEmployeeCountsByAreaUrl)}
                    title="Number of employees by area - for the top 3 companies by the number of employees" />
            </div>
            <div class="col-md-4">
                <ChartBox 
                    type="line" 
                    dataFunc={() => get(urls.chartEmployeeCountsByYearUrl)}
                    title="Top 5 companies by the number of employees - employee growth last 10 years" />
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="text-secondary fw-bolder text-center fs-4 my-2">Top rated companies</div>
                <DataGrid dataFunc={getTopCompanies} hover small>
                    <tr slot="placeholderRow">
                        <td colspan=99999>
                            <Placeholder height="30vh" />
                        </td>
                    </tr>
                    <tr slot="row" let:index let:data>
                        <th scope="row">{index+1}</th>
                        <td>
                            <div class="grid-name-wrap">
                                <div class="">{data.name}</div>
                                <div class="text-muted fs-smaller">{data.companyLine}</div>
                                <div class="image-15px" style="background-image: url({flagUrl(data.countryCode)});">
                                    {data.country}
                                </div>
                            </div>
                        </td>
                        <td>
                            {#each data.areas as area}
                                <span class="badge rounded-pill text-bg-secondary ms-1 mb-1">{area}</span>
                            {/each}
                        </td>
                        <td class="fs-smaller grid-info">
                            <div class="float-end">
                                <span class="text-muted">Score: </span><span class="font-monospace">{data.score.toFixed(2)}</span>
                            </div>
                            <br />
                            <div class="float-end">
                                <span class="text-muted">Reviews: </span><span class="font-monospace">{data.reviews}</span>
                            </div>
                        </td>
                    </tr>
                </DataGrid>
            </div>
            <div class="col">
                <div class="text-secondary fw-bolder text-center fs-4 my-2">Top experinced people</div>
                <DataGrid dataFunc={getTopEmployees} hover small>
                    <tr slot="placeholderRow">
                        <td colspan=99999>
                            <Placeholder height="30vh" />
                        </td>
                    </tr>
                    <tr slot="row" let:index let:data>
                        <th scope="row">{index+1}</th>
                        <td>
                            <div class="grid-name-wrap">
                                <div>{data.firstName} {data.lastName}</div>
                                <div class="text-muted fs-smaller">{data.employeeStatus}</div>
                                <div class="image-15px" style="background-image: url({flagUrl(data.countryCode)});">
                                    {data.country}
                                </div>
                            </div>
                        </td>
                        <td>
                            {#each data.roles as role}
                                <span class="badge rounded-pill text-bg-secondary ms-1 mb-1">{role}</span>
                            {/each}
                        </td>
                        <td class="fs-smaller grid-info">
                            <div class="float-end"><span class="text-muted">Years Of Experience: </span><span class="font-monospace">{data.yearsOfExperience}</span></div>
                            <br />
                            <div class="float-end"><span class="text-muted">Companies: </span><span class="font-monospace">{data.numberOfCompanies}</span></div>
                        </td>
                    </tr>
                </DataGrid>
            </div>

        </div>

    </div>
</Layout>

<style lang="scss">
    @import "./scss/colors";
    .main  {
        padding-left: 50px;
        padding-right: 50px;
    }
    .chart-row {
        & > div {
            padding: 25px;
        }
    }
    .grid-name-wrap {
        display: grid;
        & > div:nth-child(1) {
            grid-column: 1/2;
            grid-row: 1;
        }
        & > div:nth-child(2) {
            grid-column: 1/2;
            grid-row: 2;
        }
        & > div:nth-child(3) {
            grid-column: 2;
            grid-row: 1;
            width: fit-content;
            margin-left: auto;
            padding-top: 0px;
            padding-bottom: 0px;
            font-size: x-small;
            font-weight: bold;
            white-space: nowrap;
        }
    }
    .grid-info {
        white-space: nowrap;
        & {
            white-space: nowrap;
        }
    }
</style>