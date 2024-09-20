import { StaticRouter } from "react-router-dom/server";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider } from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";

import { apolloClientServer } from "@/configs/apollo.server";
import { Router } from "@/configs/router";
import styles from "./index.css";

export async function render(url: string) {
  const ssrContext = apolloClientServer.extract();

  if (import.meta.env.DEV) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  const appHtml = await renderToStringWithData(
    <ApolloProvider client={apolloClientServer}>
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </ApolloProvider>
  );

  return { appHtml, styles, ssrContext };
}
