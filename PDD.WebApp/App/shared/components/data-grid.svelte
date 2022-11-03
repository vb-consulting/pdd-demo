<script lang="ts">
    import { createEventDispatcher } from "svelte";

    type T = $$Generic;

    interface $$Slots {
        row: { data: T, index: number, grid: IDataGrid };
        caption: { grid: IDataGrid };
        placeholderRow: { grid: IDataGrid };
        headerRow: { grid: IDataGrid };
        topRow: { grid: IDataGrid };
        bottomRow: { grid: IDataGrid };
        noResultsRow: { grid: IDataGrid };
    }
    
    export let headers: boolean | string[] | IGridHeader[] = [];
    export let dataFunc: (() => Promise<T[]>) | undefined = undefined;
    export let dataPageFunc: ((grid: IDataGrid) => Promise<{count: number; page: T[]}>) | undefined = undefined;

    export let primary = false;
    export let secondary = false;
    export let success = false;
    export let danger = false;
    export let warning = false;
    export let info = false;
    export let light = false;
    export let dark = false;
    export let striped = false;
    export let stripedColumns = false;
    export let hover = false;
    export let bordered = false;
    export let borderless  = false;
    export let small  = false;

    export let responsive = false;
    export let responsiveSm = false;
    export let responsiveMd = false;
    export let responsiveLg = false;
    export let responsiveXl = false;
    export let responsiveXxl = false;

    export let caption = "";
    export let headerGroupDivider = false;

    export let take: number = 50;

    export const grid: IDataGrid = {
        initialized: false,
        working: false,
        skip: 0,
        count: 0,
        take,
        page: 0,
        pageCount: 0,
        setPage: async function (page: number) {
            if (page == 1) {
                this.skip = 0;
            } else {
                this.skip = (page - 1) * this.take;
            }
            await this.refresh();
        },
        refresh: async function () {
            if (dataFunc) {
                await readData();
            } else {
                await readDataPage();
            }
        }
    };
    /**
     * A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method Document.getElementsByClassName().
     */
    export { classes as class };
    /*
    * Contains CSS styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the style element have mainly the purpose of allowing for quick styling, for example for testing purposes.
    */
    export { styles as style };
    
    let classes: string = "";
    let styles: string = "";

    let data: T[];
    let _headers: string[];
    const dispatch = createEventDispatcher();

    function instanceOfIGridHeader(value: any): value is IGridHeader {
        if (typeof value == "string") {
            return false;
        }
        return "text" in value;
    }

    async function readData() {
        if (!dataFunc || grid.working) {
            return;
        }
        dispatch("render", {grid});
        grid.working = true;
        const result = await dataFunc();
        grid.count = result.length;
        grid.working = false;
        if (!grid.initialized) {
            grid.initialized = true;
        }
        if (typeof headers == "boolean" && headers == true && result.length) {
            _headers = Object.keys(result[0] as any);
        }
        data = result;
        setTimeout(() => dispatch("rendered", {grid, data}));
    }

    async function readDataPage() {
        if (!dataPageFunc || grid.working) {
            return;
        }
        dispatch("render", {grid});
        grid.working = true;
        // await one second
        //await new Promise(resolve => setTimeout(resolve, 5000));
        const result = await dataPageFunc(grid);
        grid.count = result.count;
        grid.page = grid.skip == 0 ? 1 : Math.round(grid.skip / grid.take) + 1;
        grid.pageCount = Math.ceil(grid.count / grid.take);
        grid.working = false;
        if (!grid.initialized) {
            grid.initialized = true;
        }
        if (typeof headers == "boolean" && headers == true && result.page.length) {
            _headers = Object.keys(result.page[0] as any);
        }
        data = result.page;
        setTimeout(() => dispatch("rendered", {grid, data}));
    }

</script>
<table class="table {classes || ''}" style="{styles || ''}"
    class:table-primary={primary}
    class:table-secondary={secondary}
    class:table-success={success}
    class:table-danger={danger}
    class:table-warning={warning}
    class:table-info={info}
    class:table-light={light}
    class:table-dark={dark}
    class:table-striped={striped}
    class:table-striped-columns={stripedColumns}
    class:table-hover={hover}
    class:table-bordered={bordered}
    class:table-borderless={borderless}
    class:table-sm={small}
    class:caption-top={caption || $$slots.caption}
    class:table-responsive={responsive}
    class:table-responsive-sm={responsiveSm}
    class:table-responsive-md={responsiveMd}
    class:table-responsive-lg={responsiveLg}
    class:table-responsive-xl={responsiveXl}
    class:table-responsive-xxl={responsiveXxl}>
    {#if caption || $$slots.caption}
        <caption>
            {caption}
            <slot name="caption" {grid}></slot>
        </caption>
    {/if}
    <thead>
        <slot name="headerRow" {grid}></slot>
        {#if (typeof headers != "boolean" && headers.length)}
            <tr>
                {#each headers as row}
                    {#if (instanceOfIGridHeader(row))}
                        <th 
                            scope="col" 
                            style="{(row.width ? "width: " + row.width +"; " : "")}{(row.minWidth ? "min-width: " + row.minWidth +"; " : "")}">
                            {row.text}
                        </th>
                    {:else if typeof row == "string"}
                        <th scope="col">{row}</th>
                    {/if}
                {/each}
            </tr>
        {:else if typeof headers == "boolean" && headers == true && _headers}
            <tr>
                {#each _headers as row}
                    <th scope="col"> {row}</th>
                {/each}
            </tr>
        {/if}
    </thead>
    <tbody class:table-group-divider={headerGroupDivider}>
        <slot name="topRow" {grid}></slot>
        {#if dataFunc}
            {#await readData()}
            <slot name="placeholderRow" {grid}></slot>
            {:then}
                {#each data as data, index}
                    <slot name="row" {data} {index} {grid}></slot>
                {/each}
            {/await}
        {/if}
        {#if dataPageFunc}
            {#await readDataPage()}
            <slot name="placeholderRow" {grid}></slot>
            {:then}
                {#if data && data.length}
                    {#each data as data, index}
                        <slot name="row" {data} {index} {grid}></slot>
                    {/each}
                {:else}
                    <slot name="noResultsRow" {grid}></slot>
                {/if}
            {/await}
        {/if}
        <slot name="bottomRow" {grid}></slot>
    </tbody>
</table>

<style lang="scss">
</style>
