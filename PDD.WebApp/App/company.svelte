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

    const getCompanyGroupDetails = async (details: ICompanyEmployee[]) => details;

    const getReviews = (grid: IDataGrid) => get<{
            count: number,
            page: ICompanyReview[]
        }>(urls.companyReviewsUrl, {
            id, 
            skip: grid.skip, 
            take: grid.take
        });
    
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
                    <button class="btn btn-sm btn-outline-primary">
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

        <Tabs tabs={["Employees", "Reviews", "Stats"]} hashtag class="mt-3" let:active>
            <div class:d-none={active != "Employees"}>
                <DataGrid hover borderless dataGroupFunc={getCompanyEmloyeesGroups}>
                    <tr slot="groupRow" let:key let:group>
                        <td>
                            <DataGrid 
                                small
                                class="mb-0"
                                dataFunc={() => getCompanyGroupDetails(group)}>
                                <h5 slot="caption" class="text-bg-secondary p-2 rounded">{key}</h5>
                                <tr slot="row" let:data>
                                    <td class="d-flex">
                                        <div class="align-self-center fw-bold">
                                            <div>{data.firstname} {data.lastname}</div>
                                            <CountryLabel class="fs-smaller text-muted" {data} />
                                        </div>
                                        <div class="ms-5 align-self-center">
                                            <Tokens tokens={data.roles} />
                                        </div>
                                        <div class="text-muted fs-smaller float-end" style="margin-left: auto;">
                                            <div>
                                                age: {data.age}
                                            </div>
                                            <div>
                                                exp: {data.years}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </DataGrid>
                        </td>
                    </tr>
                </DataGrid>
            </div>
            <div class:d-none={active != "Reviews"} class="pt-3">
                <DataGrid 
                    hover 
                    borderless
                    dataPageFunc={getReviews} 
                    take={10}>
                    <tr slot="row" let:data>
                        <td>
                            <Card label={`By ${data.firstname} ${data.lastname} at ${data.at}`}>
                                {data.review}
                            </Card>
                        </td>
                    </tr>
                </DataGrid>
            </div>
            <div class:d-none={active != "Stats"}>
            </div>
        </Tabs>

    </div>
</Layout>

<style lang="scss">
</style> 
