<script lang="ts">
    import Layout from "./shared/layout/default";
    import DataGrid from "./shared/components/data-grid.svelte";
    import Pager from "./shared/components/data-grid/pager.svelte";
    import { urls } from "./shared/config";
    import { get } from "./shared/fetch";

    const getCompanies = (grid: IDataGrid) => get<{
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
    }>(urls.companiesSearchUrl, {search: "", skip: grid.skip, take: grid.take});
</script>

<Layout>
    <div class="main container-fluid pt-4">

        <DataGrid dataPageFunc={getCompanies} take={15} headers={[{text: "Company"}, {text: "Line"}, {text: "About"}]} hover striped>
            <tr slot="headerRow" let:grid>
                <td colspan=99999>
                    <Pager {grid} />
                </td>
            </tr>
            <tr slot="row" let:data let:grid>
                <td class:text-muted={grid.working}>{data.name}</td>
                <td class:text-muted={grid.working}>{data.companyline}</td>
                <td class:text-muted={grid.working}>{data.about}</td>
            </tr>
            <tr slot="bottomRow" let:grid>
                <td colspan=99999>
                    <Pager {grid} />
                </td>
            </tr>
        </DataGrid>

    </div>
</Layout>

<style lang="scss">

</style>
