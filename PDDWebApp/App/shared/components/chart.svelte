<script lang="ts">
    import { Chart, registerables } from "chart.js";
    import { onMount } from "svelte";
    import { isDarkTheme } from "../layout/theme"

    export let dataFunc: () => Promise<Record<string, {"labels": Array<string>, "values": Array<number>}>>;
    export let type: "line" | "bar";
    export let defaultColorDarkTheme = "#b7c8d8";
    export let defaultBorderColorDarkTheme = "#b7c8d8";
    export let defaultColorLightTheme = "#666";
    export let defaultBorderColorLightTheme = "#666";
    
    Chart.register(...registerables);

    const basicColors = ["red", "yellow","blue","orange","green", "violet"];
    let chartCanvas: HTMLCanvasElement;
    let chart: Chart

    let fetchChartConfig = async () => {
        let data = await dataFunc();
        return {
                type,
                data: {
                    labels: Object.values(data)[0].labels,
                    datasets: Object.entries(data).map(([name, value]) => Object({ 
                        backgroundColor: basicColors,
                        label: name,
                        data: value.values
                    }))
                },
                options: {
                    plugins: {
                        legend: {
                            display: Object.values(data).length > 1,
                        }
                    }
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
