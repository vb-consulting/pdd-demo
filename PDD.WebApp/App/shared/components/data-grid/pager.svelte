<script lang="ts">
    export let grid: IDataGrid;

    let numbers: number[];
    $: {
        numbers = [];
        let from = grid.page - 1 < 1 ? 1 : grid.page - 1;
        let to = from + 2;
        for(let page = from; page <= to; page++) {
            numbers.push(page);
        }
    }
</script>

{#if !grid.initialized}
    <nav class="d-flex placeholder-glow justify-content-end">
        <span class="placeholder placeholder-lg rounded"></span>
    </nav>
{:else}
    <nav class="d-flex justify-content-end">
        <ul class="pagination justify-content-end">
            {#if grid.page > 1}
                <li class="page-item" class:disabled={grid.working} on:click={() => grid.setPage(grid.page-1)} on:keypress={() => grid.setPage(grid.page-1)}>
                    <button class="page-link">Previous</button>
                </li>
            {/if}
            {#each numbers as number}
                <li class="page-item" 
                    class:active={grid.page == number} 
                    class:disabled={grid.working} 
                    on:click={() => grid.page == number || grid.setPage(number)} 
                    on:keypress ={() => grid.page == number || grid.setPage(number)}>
                    <button class="page-link" class:active={grid.page == number} >{number}</button>
                </li>
            {/each}
            {#if grid.page <= grid.pageCount}
                <li class="page-item" class:disabled={grid.working} on:click={() => grid.setPage(grid.page+1)} on:keypress={() => grid.setPage(grid.page+1)}>
                    <button class="page-link">Next</button>
                </li>
            {/if}
        </ul>
        <div class="text-primary">some text</div>
    </nav>
{/if}

<style lang="scss">
    button.active {
        cursor: default;
    }
    .placeholder-glow {
        height: 35px;
        & > .placeholder {
            width: 25%;
            height: 100%;
        }
    }
    .pagination {
        margin-bottom: 0px;
    }
</style>
