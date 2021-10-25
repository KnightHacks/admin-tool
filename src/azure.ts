export const mconf = {
  auth: {
    clientId: process.env.REACT_AZURE_CLIENT_ID,
    authority: process.env.REACT_AZURE_AUTHORITY,
    redirectUri: process.env.REACT_AZURE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [process.env.REACT_AZURE_SCOPES],
};
