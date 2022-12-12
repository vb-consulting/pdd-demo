<script lang="ts">
    import Layout from "./shared/layout/default";
    import ChartBox from "./shared/components/chart-box.svelte";
    import DataGrid from "./shared/components/data-grid.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import Tokens from "./shared/components/tokens.svelte";
    import { createTooltips, hideTooltips } from "./shared/components/tooltips";
    import urls from "./shared/urls";
    import { get, parseUrl } from "./shared/fetch";

    import CountryLabel from "./components/country-label.svelte";
    
    interface ITopCompanies extends ICountry {
        id: string;
        name: string;
        companyLine: string;
        areas: IToken[];
        score: number;
        reviews: number;
    }
    interface ITopEmployees extends ICountry {
        id: string;
        firstName: string;
        lastName: string;
        yearsOfExperience: number;
        numberOfCompanies: number;
        employeeStatus: string;
        roles: string[];
    }

    const getTopCompanies = () => get<ITopCompanies[]>(urls.topRatedCompaniesUrl);
    const getTopEmployees = () => get<ITopEmployees[]>(urls.topExperincedPeopleUrl);
</script>

<Layout title="PDD Dashboard">

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
                <DataGrid 
                    dataFunc={getTopCompanies} 
                    hover 
                    small 
                    on:render={hideTooltips} 
                    on:rendered={createTooltips}>
                    <tr slot="placeholderRow">
                        <td colspan=99999>
                            <Placeholder height="30vh" />
                        </td>
                    </tr>
                    <tr slot="row" let:index let:data>
                        <th scope="row" class="fw-bold">{index+1}</th>
                        <td>
                            <a class="fw-bold" href="{urls.companyUrl + "/" + data.id}">{data.name}</a>
                            <div class="text-muted fs-smaller">{data.companyLine}</div>
                        </td>
                        <td>
                            <div class="d-flex flex-wrap">
                                <a class="clickable-token text-bg-primary" 
                                    data-bs-toggle="tooltip" 
                                    title="Filter companies by {data.country}"
                                    href="{parseUrl(urls.companiesUrl, {country: JSON.stringify({value: data.countrycode, name: data.country, iso2: data.countryiso2, iso3: ""})})}">
                                    <CountryLabel data={data} />
                                </a>
                            </div>
                        </td>
                        <td>
                            <Tokens 
                                tokens={data.areas} 
                                tooltip={token => `Filter companies by ${token.name}`}
                                href={token => parseUrl(urls.companiesUrl, {area: JSON.stringify({value: token.id, name: token.name})})} 
                            />
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
                        <th scope="row" class="fw-bold">{index+1}</th>
                        <td>
                            <div class="fw-bold">{data.firstName} {data.lastName}</div>
                            <div class="text-muted fs-smaller">{data.employeeStatus}</div>
                        </td>
                        <td>
                            <div class="d-flex flex-wrap">
                                <a class="clickable-token" href="{urls.companiesUrl}">
                                    <CountryLabel data={data} />
                                </a>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex flex-wrap">
                                {#each data.roles as role}
                                    <a class="clickable-token mb-1" href="{urls.companiesUrl}">{role}</a>
                                {/each}
                            </div>
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
    .grid-info {
        white-space: nowrap;
        & {
            white-space: nowrap;
        }
    }
</style>