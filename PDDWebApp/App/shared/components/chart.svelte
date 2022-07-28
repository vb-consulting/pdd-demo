<script lang="ts">
    import { Chart, registerables } from "chart.js";
    import { onMount } from "svelte";
    import { isDarkTheme } from "../layout/theme";

    export let dataFunc: () => Promise<{labels: string[], series: {data: number[], label: string | undefined}[]}>;
    export let type: "line" | "bar" | "pie" | "doughnut";
    export let datasetLabel: string = "";
    export let defaultColorDarkTheme = "#b7c8d8";
    export let defaultBorderColorDarkTheme = "#6c757d";
    export let defaultColorLightTheme = "#666";
    export let defaultBorderColorLightTheme = "#666";
    export let basicColors = ["red", "yellow","blue","orange","green", "violet", "purple", "magenta", "grey", "brown", "pink", "aqua", "navy"];
    export let displayLegend: boolean | undefined = undefined;
    
    Chart.register(...registerables);

    let chartCanvas: HTMLCanvasElement;
    let chart: Chart

    let fetchChartConfig = async () => {
        let data = await dataFunc();
        return {
                type,
                data: {
                    labels: data.labels,
                    datasets: data.series.map(series => Object({ 
                        backgroundColor: basicColors,
                        label: datasetLabel || series.label,
                        data: series.data,
                    }))
                },
                options: {
                    plugins: {
                        legend: {
                            display: displayLegend != undefined ? displayLegend : data.series.length > 1,
                        }
                    },
                }
            }
    }

    let recreateChat = async () => {
        if (!chartCanvas) {
            return;
        }
        if (!chart) {
            chart = new Chart(chartCanvas.getContext("2d") as any, await fetchChartConfig());
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

<canvas bind:this={chartCanvas}></canvas>
