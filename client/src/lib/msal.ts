import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new msal.PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["User.Read"],
};

export async function handleLogin() {
  try {
    await msalInstance.loginRedirect(loginRequest);
  } catch (error) {
    console.error(error);
  }
}

export async function handleLogout() {
  try {
    await msalInstance.logoutRedirect();
  } catch (error) {
    console.error(error);
  }
}
