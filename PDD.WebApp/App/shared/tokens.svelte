<script lang="ts">
    export let tokens: IToken[];
    export let disabled: boolean | undefined = undefined;
    export let selected: (area: IToken) => boolean = () => false;
    export let click: ((area: IToken) => void) | undefined = undefined;
    export let tooltip: (area: IToken) => string = () => "";
    export let href: ((area: IToken) => string) | undefined = undefined;
</script>

<div class="d-flex flex-wrap">
    {#each tokens as token}
        {#if href}
            <a 
                class="clickable-token mb-1" 
                {disabled} 
                class:selected={selected(token)}
                data-bs-toggle="{tooltip(token) ? "tooltip" : ""}" 
                title={tooltip(token)}
                href={href(token)}>
                {token.name}
            </a>
        {:else if click}
            <button 
                class="clickable-token mb-1" 
                {disabled} 
                class:selected={selected(token)}
                on:click={() => click && click(token)}
                data-bs-toggle="{tooltip(token) ? "tooltip" : ""}" 
                title={tooltip(token)}>
                {token.name}
            </button>
        {:else}
            <div 
                class="token text-bg-secondary mb-1" 
                {disabled} 
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
