<script lang="ts">
    import Layout from "./shared/layout/default";
    import ChartBox from "./shared/components/chart-box.svelte";
    import { urls } from "./shared/config";
    import { get } from "./shared/fetch";
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

            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

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
</style>