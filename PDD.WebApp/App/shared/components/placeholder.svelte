<script lang="ts">
    export let height: string = "";
    export let width: string = "";
</script>
<div class="placeholder-glow">
    <span 
        class="placeholder placeholder-lg col-12 rounded" 
        style="{height ? `height: ${height};` : ""}{width ? `width: ${width};` : ""}">
    </span>
</div>