declare namespace NodeJS {
  interface ProcessEnv {
    REACT_AZURE_CLIENT_ID: string;
    REACT_AZURE_AUTHORITY: string;
    REACT_AZURE_REDIRECT_URI: string;
    REACT_AZURE_SCOPES: string;
    REACT_API_URL: string;
  }
}
