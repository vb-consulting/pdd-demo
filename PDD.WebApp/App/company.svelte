<script lang="ts">
    import Layout from "./shared/layout/default";
    import Card from "./shared/components/card.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import Tokens from "./shared/components/tokens.svelte";
    import Tabs from "./shared/components/tabs.svelte";
    import DataGrid from "./shared/components/data-grid.svelte";
    import { getValue, urls } from "./shared/config";
    import { get } from "./shared/fetch";

    import CountryLabel from "./components/country-label.svelte";
    import CompanyUrl from "./components/company-url.svelte";

    let id = getValue<string>("id");
    let title = "PDD Company";

    const getCompany = async () => { 
        const company = await get<ICompanyRecord>(urls.companyDetailsUrl, {id});
        title = "PDD " + company.name;
        return company;
    };
    const getCompanyEmloyeesGroups = async () => {
        const data = await get<ICompanyEmployee[]>(urls.companyEmployeesUrl, {id});
        const result: Record<string, ICompanyEmployee[]> = {};
        for(let company of data) {
            for(let type of company.types) {
                if (result[type]) {
                    result[type].push(company);
                } else {
                    result[type] = [company];
                }
            }
        }
        return result;
    };
</script>

<Layout {title}>
    <div class="main container pt-4">
        {#await getCompany()}
        <Card label="Company Info">
            <Placeholder height="300px" />
        </Card>
        {:then company}
        <Card 
            label="Company Info"
            title={company.name}
            subtitle={company.companyline}>

            <Tokens tokens={company.areas} />
            <CountryLabel data={company} />

            <CompanyUrl {company} type="web" />
            <CompanyUrl {company} type="twitter" />
            <CompanyUrl {company} type="linkedin" />

            <Card label="About" class="mt-3">
                {company.about}
            </Card>

            <div slot="footer">
                <button class="btn btn-sm btn-primary">
                    <i class="bi-pencil"></i>Edit</button>
            </div>
        </Card>
        {:catch error}
        <Card label="Company Info">
            <div class="text-danger fw-bold">
                <i class="bi bi-bug-fill"></i>Could not load this company due to an error. :(
            </div>
            <div class="">
                Here is what we know so far: <div class="text-danger">{error}</div>
            </div>
        </Card>
        {/await}

        <Tabs tabs={["Employees", "Reviews", "Stats"]} class="mt-3" let:active>
        {#if active == "Employees"}

            <DataGrid hover striped dataGroupFunc={getCompanyEmloyeesGroups}>
                <tr slot="groupRow" let:key let:group>
                    <td>
                        <table class="table table-sm caption-top mb-0">
                            <caption class="h5">{key}</caption>
                            <thead>
                            <tr>
                                <th scope="col">Employee</th>
                                <th scope="col">Country</th>
                                <th scope="col">Roles</th>
                                <th scope="col">Age</th>
                                <th scope="col">Years</th>
                            </tr>
                            </thead>
                            {#each group as data}
                            <tr>
                                <td>{data.firstname} {data.lastname}</td>
                                <td><CountryLabel {data} /></td>
                                <td><Tokens tokens={data.roles} /></td>
                                <td>{data.age}</td>
                                <td>{data.years}</td>
                            </tr>
                            {/each}
                        </table>
                    </td>
                </tr>
            </DataGrid>

        {:else if active == "Reviews"}
            Reviews
        {/if}
        </Tabs>

    </div>
</Layout>

<style lang="scss">
</style> 