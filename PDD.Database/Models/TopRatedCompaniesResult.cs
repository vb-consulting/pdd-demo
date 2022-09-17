#pragma warning disable CS8632
// pgroutiner auto-generated code
using System;
using System.Linq;
using System.Collections.Generic;

namespace PDD.Database.Models;

public class TopRatedCompaniesResult
{
    public Guid? Id { get; set; }
    public string? Name { get; set; }
    public string? CompanyLine { get; set; }
    public string? Country { get; set; }
    public short? CountryCode { get; set; }
    public string[]? Areas { get; set; }
    public decimal? Score { get; set; }
    public long? Reviews { get; set; }
}
