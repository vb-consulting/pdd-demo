<script lang="ts">
    import Placeholder from "./placeholder.svelte";
    export let grid: IDataGrid;
    export let numberCount: number = 3;

    let numbers: number[];
    let lastPage = 0;

    function setPage(page: number) {
        if (grid.working || grid.page == page || !grid.initialized) {
            return;
        }
        grid.setPage(page);
    }

    $: {
        if (grid && (!numbers || lastPage != grid.page)) {
            let index = !numbers ? -1 : numbers.indexOf(grid.page);
            if (numbers && index != -1 && index > 0 && index < numbers.length - 1) {
                lastPage = grid.page;
            } else {
                numbers = [];
                let from = grid.page - 1 < 1 ? 1 : grid.page - 1;
                let to: number;
                if (from + numberCount > grid.pageCount) {
                    to = grid.pageCount;
                    from = grid.pageCount - numberCount;
                }
                else {
                    to = from + numberCount;
                }
                for(let page = from; page <= to; page++) {
                    numbers.push(page);
                }
                lastPage = grid.page;
            }
        }
    }
</script>

{#if !grid?.initialized}
    <Placeholder height="35px" width="250px"/>
{:else}
    <nav>
        <ul class="pagination">
            {#if numbers && numbers.indexOf(1) == -1}
                <li class="page-item" class:disabled={grid.working}>
                    <button class="page-link" on:click={() => setPage(1)}>First</button>
                </li>
            {/if}
            {#if grid.page > 1}
                <li class="page-item" class:disabled={grid.working}>
                    <button class="page-link" on:click={() => setPage(grid.page-1)}>Previous</button>
                </li>
            {/if}
            {#each numbers as number}
                <li class="page-item" class:active={grid.page == number} class:disabled={grid.working}>
                    <button class="page-link" class:disabled={grid.page == number} class:active={grid.page == number} on:click={() => setPage(number)}>{number}</button>
                </li>
            {/each}
            {#if grid.page < grid.pageCount}
                <li class="page-item" class:disabled={grid.working}>
                    <button class="page-link" on:click={() => setPage(grid.page+1)}>Next</button>
                </li>
            {/if}
            {#if numbers && numbers.indexOf(grid.pageCount) == -1}
                <li class="page-item" class:disabled={grid.working}>
                    <button class="page-link" on:click={() => setPage(grid.pageCount)}>Last</button>
                </li>
            {/if}
        </ul>
    </nav>
    <div class="text-primary info" class:text-muted={grid.working}>
        Page <b>{grid.page}</b> of <b>{grid.pageCount}</b>. Total <b>{grid.count}</b> items.
        {#if grid.working}
        <div class="spinner-border"></div>
        {/if}
    </div>
{/if}

<style lang="scss">
    .info {
        font-size: 0.85rem;
        white-space: nowrap;
        & > div {
            font-size: 0.85rem;
            width: 15px;
            height: 15px;
        }
    }
    button.active.disabled {
        background-color: var(--bs-primary);
    }
    .pagination {
        margin-bottom: 0px;
    }
</style>
