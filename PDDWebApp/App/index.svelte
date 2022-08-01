<script lang="ts">
    import Layout from "./shared/layout/default";
    import ChartBox from "./shared/components/chart-box.svelte";
    import urls from "./shared/urls";
</script>

<Layout title="PDD Dashboard">

    <div class="main container-fluid pt-4">
        <div class="row">
            <div class="col-md-4 border-top border-start chart">
                <ChartBox 
                    type="bar" 
                    getUrl={urls.chart1Url} 
                    datasetLabel="Number of employees: " 
                    title="Top 10 companies by the number of employees" />
            </div>
            <div class="col-md-4 border-top border-start chart">
                <ChartBox 
                    type="line" 
                    getUrl={urls.chart2Url} 
                    title="Top 5 companies by the number of employees - employee growth last 10 years" />
            </div>
            <div class="col-md-4 border-top border-start border-end chart">
                <ChartBox 
                    type="doughnut" 
                    getUrl={urls.chart3Url} 
                    minHeight="300px"
                    displayLegend={true}
                    title="Number of companies by business areas" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 border-top border-start border-bottom chart">
                <ChartBox 
                    type="pie" 
                    getUrl={urls.chart4Url} 
                    minHeight="300px"
                    displayLegend={true}
                    title="Top 10 companies by the country" />
            </div>
            <div class="col-md-4 border-top border-start border-bottom chart">
                <ChartBox 
                    type="bar" 
                    getUrl={urls.chart5Url} 
                    title="Top 10 companies by the number of employees" />
            </div>
            <div class="col-md-4 border-top border-start border-end border-bottom chart">
                <ChartBox 
                    type="bar" 
                    getUrl={urls.chart6Url} 
                    title="Number of employees by area - for the top 3 companies by the number of employees" />
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
</style>