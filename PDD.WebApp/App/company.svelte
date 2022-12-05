<script lang="ts">
    import Layout from "./shared/layout/default";
    import Card from "./shared/components/card.svelte";
    import Placeholder from "./shared/components/placeholder.svelte";
    import CountryLabel from "./shared/country-label.svelte";
    import CompanyUrl from "./shared/company-url.svelte";
    import Tokens from "./shared/tokens.svelte";
    import { getValue, urls } from "./shared/config";
    import { get } from "./shared/fetch";

    let id = getValue<string>("id");
    const getCompany = () => get<ICompanyRecord>(urls.companyDetailsUrl, {id}, true);

</script>

<Layout>
    <div class="main container pt-4">

      {#await getCompany()}
        <Placeholder height="400px" />
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
            <i class="bi-pencil"></i>
            Edit
          </button>
        </div>
      </Card>

      { :catch error}
        <div class="text-danger fw-bold">
            <i class="bi bi-bug-fill"></i>
            Could not load this company due to an error. :(
        </div>
        <div class="">
            Here is what we know so far: <div class="text-danger">{error}</div>
        </div>
      {/await}

      <ul class="nav nav-tabs mt-3">
        <li class="nav-item">
          <div class="nav-link active">Employees</div>
        </li>
        <li class="nav-item">
          <div class="nav-link">Reviews</div>
        </li>
      </ul>


    </div>
</Layout>

<style lang="scss">
</style> 
