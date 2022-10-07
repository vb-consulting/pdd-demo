﻿using Newtonsoft.Json;

namespace PDD.WebApp;

public partial class Urls
{
    [JsonProperty] public const string ChartCompaniesByCountryUrl = "api/chart/companies-by-country";
    [JsonProperty] public const string ChartEmployeeCountsByAreaUrl = "api/chart/employee-counts-by-area";
    [JsonProperty] public const string ChartEmployeeCountsByYearUrl = "api/chart/employee-counts-by-year";
    [JsonProperty] public const string TopRatedCompaniesUrl = "api/top-rated-companies";
    [JsonProperty] public const string TopExperincedPeopleUrl = "api/top-experinced-people";
    [JsonProperty] public const string CompaniesSearchUrl = "api/companies-search";
}