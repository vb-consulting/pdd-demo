<script lang="ts">
    export let tokens: IToken[];
    export let disabled: boolean = false;
    export let selected: (area: IToken) => boolean = () => false;
    export let click: ((area: IToken) => void) | undefined = undefined;
    export let tooltip: (area: IToken) => string = () => "";
    export let href: (area: IToken) => string = () => "";
</script>

<div class="d-flex flex-wrap">
    {#each tokens as token}
        {#if click != undefined}
            {#if href(token)}
                <a 
                    class="clickable-token mb-1" 
                    {disabled} 
                    class:selected={selected(token)}
                    on:click={() => click && click(token)}
                    data-bs-toggle="{tooltip(token) ? "tooltip" : ""}" 
                    title={tooltip(token)}
                    href={href(token)}>
                    {token.name}
                </a>
            {:else}
                <button 
                    class="clickable-token mb-1" 
                    {disabled} 
                    class:selected={selected(token)}
                    on:click={() => click && click(token)}
                    data-bs-toggle="{tooltip(token) ? "tooltip" : ""}" 
                    title={tooltip(token)}>
                    {token.name}
                </button>
            {/if}
        {:else}
            <div 
                class="token mb-1" 
                class:selected={selected(token)}
                data-bs-toggle="{tooltip(token) ? "tooltip" : ""}" 
                title={tooltip(token)}>
                {token.name}
            </div>
        {/if}
    {/each}
</div>

<style lang="scss">
</style> 
