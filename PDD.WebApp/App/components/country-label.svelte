<script lang="ts" context="module">
    const backgroundImage = "background-image: url(https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/";

    export function countryFlagBackground (code: string) {
        return (code ? `${backgroundImage}${code.toLowerCase()}.svg)` : "");
    }
</script>

<script lang="ts">
    export let data: ICountry;
    export let tooltip: string = "";
        /**
     * A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method Document.getElementsByClassName().
     */
    export { classes as class };
    /*
    * Contains CSS styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the style element have mainly the purpose of allowing for quick styling, for example for testing purposes.
    */
    export { styles as style };

    export let colorTheme: ColorThemeType = "none" ;
    
    let classes: string = "";
    let styles: string = "";
</script>

<div class="image-15px {classes || ''} {colorTheme == "none" ? "" : "text-bg-" + colorTheme}" 
    style="background-position-y: center;{(data.countryiso2 ? `${backgroundImage}${data.countryiso2.toLowerCase()}.svg)` : "")} {styles || ''}"
    data-bs-toggle="{tooltip ? "tooltip" : ""}" 
    title={tooltip}>
    {data.country}
</div>

<style lang="scss">
</style> 
