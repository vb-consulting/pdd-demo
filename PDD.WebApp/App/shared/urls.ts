import { getFromJson } from "./config";

const urls = getFromJson<{
    indexUrl: string;
    companiesUrl: string;
    peopleUrl: string;
    
    loginUrl: string;
    logoutUrl: string;
    signInGoogleUrl: string;
    signInLinkedInUrl: string;
    signInGitHubUrl: string;

    chart1Url: string;
    chart2Url: string;
    chart3Url: string;
    chart4Url: string;
    chart5Url: string;
    chart6Url: string;
}>("urls");

export default urls;