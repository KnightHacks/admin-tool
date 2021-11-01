declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_AZURE_CLIENT_ID: string;
    REACT_APP_AZURE_AUTHORITY: string;
    REACT_APP_AZURE_REDIRECT_URI: string;
    REACT_APP_AZURE_SCOPES: string;
    REACT_APP_API_URL: string;
  }
}
