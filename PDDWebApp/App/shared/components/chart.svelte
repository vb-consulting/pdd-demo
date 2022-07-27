<script lang="ts">
    import { Chart, registerables } from "chart.js";
    import { onMount } from "svelte";
    import { isDarkTheme } from "../layout/theme"

    //{"companies" : {"labels" : ["Wunsch LLC", "Sipes Inc", ], "values" : [137, 112, ]}}
    //export let 
    export let type: "line" | "bar";
    
    Chart.register(...registerables);

    let chartValues = [55, 49, 44, 24, 15];
    let chartLabels = ["Italy", "France", "Spain", "USA", "Argentina"];
    let chartCanvas: HTMLCanvasElement;
    let chart: Chart

    let recreateChat = () => {
        chart = new Chart(chartCanvas.getContext("2d") as any, {
            type: type,
            data: {
                labels: chartLabels,
                datasets: [{
                    backgroundColor: ["red", "green","blue","orange","brown"],
                    borderColor: "red",//'rgb(255, 99, 132)',
                    data: chartValues,
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Custom Chart Title'
                    }
                },
                
                //backgroundColor: "rgba(0, 0, 0, 0.1)",
                //borderColor: "white", //"rgba(0, 0, 0, 0.1)",
                //color: "white", //"#666",
            }
        });
    }

    onMount(recreateChat);

    $: {
        if ($isDarkTheme) {
            Chart.defaults.color = "#b7c8d8";
            Chart.defaults.borderColor = "#b7c8d8";
        } else {
            Chart.defaults.color = "#666";
            Chart.defaults.borderColor = "#666";
        }
        if (chart) {
            chart.destroy();
            recreateChat();
        }
    }

</script>

<canvas bind:this={chartCanvas}></canvas>
