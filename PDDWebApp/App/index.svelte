<script lang="ts">
    import Layout from "./shared/layout/default";
    import Chart from "./shared/components/chart.svelte";
    import { get } from "./shared/fetch";
    import urls from "./shared/urls";
</script>

<Layout title="PDD Dashboard">

    <div class="main container-fluid text-center pt-4">
        <div class="row">
            <div class="col-md-4 chart">
                <p>Top 10 companies by the number of employees</p>
                <Chart type="bar" dataFunc={() => get(urls.chart1Url)} datasetLabel="Number of employees: " />
            </div>
            <div class="col-md-4 chart">
                <p>Top 10 companies by the number of employees - employee growth last 10 years</p>
                <Chart type="line" dataFunc={() => get(urls.chart2Url)} />
            </div>
            <div class="col-md-4 chart">
                <p>Number of companies by business areas</p>
                <div class="chart-fixed-size">
                    <Chart type="pie" dataFunc={() => get(urls.chart3Url)} displayLegend={true} />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 chart">
                <!-- <Chart /> -->
            </div>
            <div class="col-md-4 chart">
                <!-- <Chart /> -->
            </div>
            <div class="col-md-4 chart">
                <!-- <Chart /> -->
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
        border: 1px $gray-700 dotted;
    }
    .chart-fixed-size {
        display: inline-block;
        position: relative;
        height: 150px;
    }
</style>