<script lang="ts">
    type T = $$Generic;
    export let headers: (string | {
        text: string; 
        width?: string; 
        minWidth?: string
    })[] = [];
    export let dataFunc: (() => Promise<T[]>);
    
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

    interface $$Slots {
        row: { data: T, index: number };
        caption: {};
    }
</script>

<table class="table"
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
            <slot name="caption"></slot>
        </caption>
    {/if}
    <thead>
        <tr>
            {#each headers as row}
                {#if typeof row == "string"}
                    <th scope="col">{row}</th>
                {:else}
                    <th scope="col" style="{(row.width ? "width: " + row.width +"; " : "")}{(row.minWidth ? "min-width: " + row.minWidth +"; " : "")}">{row.text}</th>
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody class:table-group-divider={headerGroupDivider}>
        {#await dataFunc()}
        <tr>
            <td colspan=99999>
                <div class="placeholder-glow">
                    <span class="placeholder placeholder-lg col-12"></span>
                </div>
            </td>
        </tr>
        {:then response}
            {#each response as data, index}
                <slot name="row" {data} {index}></slot>
            {/each}
        {/await}
    </tbody>
</table>

<style lang="scss">
</style>