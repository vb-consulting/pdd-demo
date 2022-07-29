<script lang="ts">
    import Layout from "./shared/layout/default";
    import Chart from "./shared/components/chart.svelte";
    import { get } from "./shared/fetch";
    import urls from "./shared/urls";
</script>

<Layout title="PDD Dashboard">

    <div class="main container-fluid text-center pt-4">
        <div class="row">
            <div class="col-md-4 border-top border-start chart">
                <div class="text-primary fw-bolder">Top 10 companies by the number of employees</div>
                <Chart type="bar" dataFunc={() => get(urls.chart1Url)} datasetLabel="Number of employees: " />
                
            </div>
            <div class="col-md-4 border-top border-start chart">
                <div class="text-primary fw-bolder">Top 5 companies by the number of employees - employee growth last 10 years</div>
                <Chart type="line" dataFunc={() => get(urls.chart2Url)} />
            </div>
            <div class="col-md-4 border-top border-start border-end chart">
                <div class="text-primary fw-bolder">Number of companies by business areas</div>
                <div class="chart-fixed-size">
                    <Chart type="doughnut" dataFunc={() => get(urls.chart3Url)} displayLegend={true} />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 border-top border-start border-bottom chart">
                <div class="text-primary fw-bolder">Top 10 companies by the countries</div>
                <div class="chart-fixed-size">
                    <Chart type="pie" dataFunc={() => get(urls.chart4Url)} displayLegend={true} />
                </div>
            </div>
            <div class="col-md-4 border-top border-start border-bottom chart">
                <div class="text-primary fw-bolder">Top 10 companies by the number of employees</div>
                <Chart type="bar" dataFunc={() => get(urls.chart5Url)} />
            </div>
            <div class="col-md-4 border-top border-start border-end border-bottom chart">
                <div class="text-primary fw-bolder">Number of employees by area - for the top 3 companies by the number of employees</div>
                <Chart type="bar" dataFunc={() => get(urls.chart6Url)} />
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
    .chart {
        padding: 25px;
    }
    .chart-fixed-size {
        display: inline-block;
        position: relative;
        min-height: 300px;
    }
</style>