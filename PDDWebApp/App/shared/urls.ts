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
}>("urls");

export default urls;