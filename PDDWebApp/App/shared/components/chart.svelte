<script>
    import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
    import { onMount } from 'svelte';

    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

    let chartValues = [20, 10, 5, 2, 20, 30, 45];
    let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let ctx;
    let chartCanvas;

    onMount(async (promise) => {
        ctx = chartCanvas.getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Revenue',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartValues
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Custom Chart Title'
                    }
                }
            }
        });

        //chart.resize();
    });

</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>