<script lang="ts">
    import Layout from "./shared/layout/default";
    import Chart from "./shared/components/chart.svelte";

</script>

<Layout title="PDD Dashboard">

    <div class="container pt-4">
        <div class="row" >
            <div class="col">
                <Chart type="line" />
            </div>
            <div class="col">
                <Chart type="bar" /> 
            </div>
            <!-- <div class="col">
                <Chart />
            </div> -->
        </div>

        <div class="row">
            <div class="col">
                <!-- <Chart /> -->
            </div>
            <div class="col">
                <!-- <Chart /> -->
            </div>
            <!-- <div class="col">
                <Chart />
            </div> -->
        </div>
    </div>
</Layout>

<style lang="scss">

</style>