<script lang="ts">
    import { Chart, registerables } from "chart.js";
    import { onMount } from "svelte";
    import { isDarkTheme } from "../layout/theme";

    export let dataFunc: () => Promise<{labels: string[], series: {data: number[], label: string | undefined}[]}>;
    export let type: ChartType;
    export let datasetLabel: string = "";
    export let defaultColorDarkTheme = "#b7c8d8";
    export let defaultBorderColorDarkTheme = "#6c757d";
    export let defaultColorLightTheme = "#666";
    export let defaultBorderColorLightTheme = "#666";
    export let basicColors = ["red", "yellow","blue","orange","green", "violet", "purple", "magenta", "grey", "brown", "pink", "aqua", "navy"];
    export let displayLegend: boolean | undefined = undefined;
    export let seriesBackgroundColor: string[] | string | undefined = (type == "line" ? undefined : basicColors);
    export let seriesColor: string[] | string | undefined = (type == "line" ? basicColors : undefined);
    
    Chart.register(...registerables);

    let chartCanvas: HTMLCanvasElement;
    let chart: Chart;
    let loading = true;

    let getColorByIndex = (index: number) => {
        return basicColors[index % basicColors.length];
    }

    let recreateChat = async () => {
        if (!chartCanvas) {
            return;
        }
        if (!chart) {
            loading = true;
            let data = await dataFunc();
            loading = false;
            chart = new Chart(chartCanvas.getContext("2d") as any, {
                type,
                data: {
                    labels: data.labels,
                    datasets: data.series.map((series, index) => Object({ 
                        backgroundColor: data.series.length > 1 ? getColorByIndex(index) : seriesBackgroundColor,
                        label: datasetLabel || series.label,
                        data: series.data,
                        borderColor: seriesColor,
                    }))

                },
                options: {
                    plugins: {
                        legend: {
                            display: displayLegend != undefined ? displayLegend : data.series.length > 1
                        }
                    }
                }
            });
        } else {
            let data = JSON.parse(JSON.stringify(chart.data));
            let options = JSON.parse(JSON.stringify(chart.options));
            let ctx = chart.ctx;
            chart.destroy();
            chart = new Chart(ctx, {type, data, options});
        }
    }

    onMount(recreateChat);

    $: {
        if ($isDarkTheme) {
            Chart.defaults.color = defaultColorDarkTheme;
            Chart.defaults.borderColor = defaultBorderColorDarkTheme;
        } else {
            Chart.defaults.color = defaultColorLightTheme;
            Chart.defaults.borderColor = defaultBorderColorLightTheme;
        }
        if (chart) {
            recreateChat();
        }
    }

</script>

<div class="placeholder-glow">
    <canvas class:chart-loading={loading} class:placeholder={loading} bind:this={chartCanvas}></canvas>
</div>

<style lang="scss">
    .chart-loading  {
        width: 75%;
        height: 75%;
        margin: 5%;
        border-radius: 5%;
    }
</style>
