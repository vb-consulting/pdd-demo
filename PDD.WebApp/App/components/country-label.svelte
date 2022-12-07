<script lang="ts" context="module">
    const backgroundImage = "background-image: url(https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/";

    export function countryFlagBackground (code: string) {
        return (code ? `${backgroundImage}${code.toLowerCase()}.svg)` : "");
    }
</script>

<script lang="ts">
    export let data: ICountry;
    export let tooltip: string = "";
</script>

<div class="image-15px" 
    style="background-position-y: center;{(data.countryiso2 ? `${backgroundImage}${data.countryiso2.toLowerCase()}.svg)` : "")}"
    data-bs-toggle="{tooltip ? "tooltip" : ""}" 
    title={tooltip}>
    {data.country}
</div>

<style lang="scss">
    .image-15px {
        background-size: 15px;
        background-repeat: no-repeat;
        background-position-x: left;
        background-position-y: 3px;
        padding-left: 18px;
    }
</style> 
