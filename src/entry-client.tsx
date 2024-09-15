import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "./configs/apollo-client";
import { Router } from "./configs/router";
import "./index.css";

ReactDOM.hydrateRoot(
  document.getElementById("app")!,
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ApolloProvider>
);
console.log("hydrated");
