import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Ensure MSAL is properly configured
if (!msalConfig.auth.clientId) {
  throw new Error("MSAL Client ID is not configured. Please check your environment variables.");
}

if (!import.meta.env.VITE_TENANT_ID) {
  throw new Error("Azure Tenant ID is not configured. Please check your environment variables.");
}

export const msalInstance = new msal.PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["User.Read"],
};

export async function handleLogin() {
  try {
    await msalInstance.loginPopup(loginRequest);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function handleLogout() {
  try {
    await msalInstance.logoutPopup();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}