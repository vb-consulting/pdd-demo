interface IRecord {
    createdat: string;
    modifiedat: string;
    createdby: string;
    modifiedby: string;
}

interface ICountry {
    countrycode: number,
    countryiso2: string,
    country: string,
}

interface IToken {id: number, name: string}

interface ICompany extends ICountry {
    id: string,
    name: string,
    companyline: string,
    about: string,
    web: string,
    twitter?: string,
    linkedin?: string,
    areas: IToken[]
}

interface ICompanyGridItem extends ICompany {
    reviews: number,
    score: number
}

interface ICompanyRecord extends ICompany, IRecord {
}

