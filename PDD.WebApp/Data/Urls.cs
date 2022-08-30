using Newtonsoft.Json;

namespace PDD.WebApp;

public partial class Urls
{
    [JsonProperty] public const string ChartCompaniesByCountryUrl = "api/chart/companies-by-country";
    [JsonProperty] public const string ChartEmployeeCountsByAreaUrl = "api/chart/employee-counts-by-area";
    [JsonProperty] public const string ChartEmployeeCountsByYearUrl = "api/chart/employee-counts-by-year";
}