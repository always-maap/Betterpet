import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BASE_URL, BASE_URL_GLOBAL } from "../apis/constants";

const httpLink = createHttpLink({
  uri: BASE_URL,
});

const globalHttpLink = createHttpLink({
  uri: BASE_URL_GLOBAL,
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkUyWHVRRG9lSmllTSIsImVtYWlsIjoibW9oYW1tYWRhbGkuYXAuMjAwMEBnbWFpbC5jb20iLCJpYXQiOjE3MjU2NzA5MzIsImV4cCI6MTcyODA5MDEzMn0.uQVR978j0T9v35lg5kEWc6S-Pu1MB3iPjZMjJ7cSY9M";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().apiName === "global",
    globalHttpLink,
    authLink.concat(httpLink)
  ),
  cache: new InMemoryCache(),
});
