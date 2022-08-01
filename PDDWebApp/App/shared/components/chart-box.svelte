<script lang="ts">
    import Chart from "./chart.svelte";
    import Modal from "./modal.svelte";
    import { get } from "../fetch";

    export let title: string;
    export let type: ChartType;
    export let getUrl: string;
    export let datasetLabel: string = "";
    export let minHeight: string = "";
    export let displayLegend: boolean | undefined = undefined;

    let modal = {open: false};
</script>

<div class="title-wrap">
    <div class="text-secondary fw-bolder text-center fs-4">{title}</div>
    <i class="bi bi-box-arrow-up-right" on:click={() => modal.open = true} data-bs-toggle="tooltip" title="Open in fullscreen"></i>
</div>

{#if minHeight}
    <div class="chart-fixed-size" style="min-height: {minHeight}; width: {minHeight};">
        <Chart type={type} dataFunc={() => get(getUrl)} datasetLabel={datasetLabel} displayLegend={displayLegend} />
    </div>
{:else}
    <Chart type={type} dataFunc={() => get(getUrl)} datasetLabel={datasetLabel} displayLegend={displayLegend} />
{/if}

<Modal state={modal} fullscreen={true} title={title} closeBtn={true} titleCloseButton={true}>
    <div class="modal-wrap" style="grid-template-columns: {(type=="bar" || type=="doughnut" ? "40%" : "75%")}">
        <Chart type={type} dataFunc={() => get(getUrl)} datasetLabel={datasetLabel} displayLegend={displayLegend} />
    </div>
</Modal>

<style lang="scss">
    .chart-fixed-size {
        display: inline-block; 
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .title-wrap {
        display: grid;
        grid-template-columns: auto min-content;
    }
    .bi {
        cursor: pointer;
        align-self: start;
    }
    .modal-wrap {
        display: grid;
    }
</style>