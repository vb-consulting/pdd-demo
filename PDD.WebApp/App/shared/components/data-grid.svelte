<script lang="ts">
    import PlaceholderRow from "./data-grid/placeholder-row.svelte";

    type T = $$Generic;
    export let headers: (string | {
        text: string; 
        width?: string; 
        minWidth?: string
    })[] = [];
    export let dataFunc: (() => Promise<T[]>) | undefined = undefined;
    export let dataPageFunc: ((skip: number, take: number) => Promise<{count: number; page: T[]}>) | undefined = undefined;

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

    export let placeholderHeight = "25vh"

    export let take: number = 50;
    export let pager: "top-start" | "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end" = "bottom-end";

    let skip: number = 0; 
    let count: number;

    interface $$Slots {
        row: { data: T, index: number };
        caption: {};
    }
</script>

{#if dataPageFunc && (pager == "top-start" || pager == "top-center" || pager == "top-end")}
<nav>
    <ul class="pagination" 
        class:justify-content-start={pager == "top-start"} 
        class:justify-content-center={pager == "top-center"} 
        class:justify-content-end={pager == "top-end"}>
    <li class="page-item disabled"><button class="page-link">Previous</button></li>
    <li class="page-item active"><button class="page-link">1</button></li>
    <li class="page-item"><button class="page-link">2</button></li>
    <li class="page-item"><button class="page-link">3</button></li>
    <li class="page-item"><button class="page-link">Next</button></li>
    </ul>
</nav>
{/if}
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
        {#if dataFunc}
            {#await dataFunc()}
                <PlaceholderRow placeholderHeight={placeholderHeight} />
            {:then response}
                {#each response as data, index}
                    <slot name="row" {data} {index}></slot>
                {/each}
            {/await}
        {/if}
        {#if dataPageFunc}
            {#await dataPageFunc(skip, take)}
                <PlaceholderRow placeholderHeight={placeholderHeight} />
            {:then response}
                {#each response.page as data, index}
                    <slot name="row" {data} {index}></slot>
                {/each}
            {/await}
        {/if}
    </tbody>
</table>
<!-- {#if dataPageFunc && (pager == "bottom-start" || pager == "bottom-center" || pager == "bottom-end")}
<nav aria-label="Page navigation example">
    <ul class="pagination" 
        class:justify-content-start={pager == "bottom-start"} 
        class:justify-content-center={pager == "bottom-center"} 
        class:justify-content-end={pager == "bottom-end"}>
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
{/if} -->
