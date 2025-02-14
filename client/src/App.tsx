import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { msalInstance } from "./lib/msal";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Features from "@/pages/features";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { accounts } = useMsal();
  const [, setLocation] = useLocation();

  if (accounts.length === 0) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <div className="w-64">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      </Route>
      <Route path="/features">
        <RequireAuth>
          <Features />
        </RequireAuth>
      </Route>
      <Route path="/settings">
        <RequireAuth>
          <Settings />
        </RequireAuth>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </MsalProvider>
  );
}

export default App;
