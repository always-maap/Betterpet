import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { apolloClient } from "@/configs/apollo.client";
import { Router } from "@/configs/router";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.hydrateRoot(
  document.getElementById("app")!,
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="bp-theme">
        <Router />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
console.log("hydrated");
