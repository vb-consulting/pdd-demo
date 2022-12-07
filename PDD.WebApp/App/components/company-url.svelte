<script lang="ts">
    export let company: ICompany;
    export let type: "twitter" | "linkedin" | "web";

    let text: string;
    if (type == "web") {
        text = company.web;
    } else  {
        if (company[type]) {
            let split = (company[type] as string).split("/").filter(s => s != "");
            text = "@" + split[split.length-1];
        }
    }
</script>

{#if company[type]}
    <a class="d-block" href={company[type]}><i class="me-1 bi-{type == "web" ? "globe" : type}"></i>{text}</a>
{:else}
    <div class="text-muted"><i class="me-1 bi-{type == "web" ? "globe" : type}"></i>-</div>
{/if}

<style lang="scss">
    a {
        width: fit-content;
    }
</style> 
