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
    // Changed from loginRedirect to loginPopup
    await msalInstance.loginPopup(loginRequest);
  } catch (error) {
    console.error(error);
  }
}

export async function handleLogout() {
  try {
    // Changed from logoutRedirect to logoutPopup
    await msalInstance.logoutPopup();
  } catch (error) {
    console.error(error);
  }
}