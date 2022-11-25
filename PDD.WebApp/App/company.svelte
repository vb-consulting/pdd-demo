<script lang="ts">
    import Layout from "./shared/layout/default";
    import Card from "./shared/components/card.svelte";
    import CountryLabel from "./shared/country-label.svelte";
    import Tokens from "./shared/tokens.svelte";
    import { getValue, urls } from "./shared/config";
    import { get } from "./shared/fetch";

    let id = getValue<string>("id");
    const getCompany = () => get<ICompanyRecord>(urls.companyDetailsUrl, {id}, true);

</script>

<Layout>
    <div class="main container pt-4">

      {#await getCompany()}
      <div>loading..</div>
      {:then company}

      <Card 
        label="Company Info"
        title={company.name}
        subtitle={company.companyline}>
        
        <Tokens tokens={company.areas} />

        <div class="company my-3">

          <div class="label">Name</div>
          <CountryLabel data={company} />

          <div class="label">Web</div>
          <div>{company.web}</div>

          <div class="label">Linkedin</div>
          <div>{company.linkedin}</div>

          <div class="label">Twitter</div>
          <div>{company.twitter}</div>

        </div>
      
        <div slot="footer">
          <button class="btn btn-sm btn-primary">
            <i class="bi-pencil"></i>
            Edit
          </button>
        </div>
      </Card>

      { :catch error}
        <p>An error occurred!</p>
      {/await}


    </div>
</Layout>

<style lang="scss">
  .company {
    display: grid; 
    grid-template-columns: max-content auto;
    & > .label {
      padding-right: 15px;
      padding-left: 5px;
      margin-right: 10px;
      background-color: var(--bs-body-bg);
      filter: brightness(91%);
      opacity: 80%;
    }
  }
</style> 
