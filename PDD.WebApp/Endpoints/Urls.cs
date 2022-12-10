using Newtonsoft.Json;

namespace PDD.WebApp;

public partial class Urls
{
    [JsonProperty] public const string ChartCompaniesByCountryUrl = "/api/dashboard/companies-by-country";
    [JsonProperty] public const string ChartEmployeeCountsByAreaUrl = "/api/dashboard/employee-counts-by-area";
    [JsonProperty] public const string ChartEmployeeCountsByYearUrl = "/api/dashboard/employee-counts-by-year";
    [JsonProperty] public const string TopRatedCompaniesUrl = "/api/dashboard/top-rated-companies";
    [JsonProperty] public const string TopExperincedPeopleUrl = "/api/top-experinced-people";
    
    [JsonProperty] public const string CompaniesSearchUrl = "/api/companies/search";
    [JsonProperty] public const string CompaniesCountriesSearchUrl = "/api/companies/countries-search";
    [JsonProperty] public const string BusinessAreasUrl = "/api/companies/business-areas";
    
    [JsonProperty] public const string CompanyDetailsUrl = "/api/company/details";
    [JsonProperty] public const string CompanyEmployeesUrl = "/api/company/employees";
    [JsonProperty] public const string CompanyReviewsUrl = "/api/company/reviews";
}