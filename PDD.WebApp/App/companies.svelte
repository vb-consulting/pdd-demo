<script lang="ts">
    import Layout from "./shared/layout/default";
    import DataGrid from "./shared/components/data-grid.svelte";
    import { urls } from "./shared/config";
    import { get } from "./shared/fetch";

    const getCompanies = (skip: number, take: number) => get<{
        count: number,
        page: {
            id: string,
            name: string,
            companyline: string,
            about: string,
            countrycode: number,
            country: string,
            areas: string[]
        }[]
    }>(urls.companiesSearchUrl, {search: "", skip, take});

</script>

<Layout>
    <div class="main container-fluid pt-4">

        <DataGrid dataPageFunc={getCompanies} take={10} pagerHorizontalPos="end" hover striped bordered>
            <tr slot="row" let:data>
                <td>{data.name}</td>
                <td>{data.companyline}</td>
                <td>{data.about}</td>
            </tr>
        </DataGrid>

    </div>
</Layout>

<style lang="scss">

</style>
