import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BETTERMODE_BASEURL } from "../apis/constants";

const httpLink = createHttpLink({
  uri: BETTERMODE_BASEURL,
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlcyMktWVGpweDciLCJuZXR3b3JrSWQiOiI3S05hckFlVWVvIiwibmV0d29ya0RvbWFpbiI6ImJldHRlcnBldC5iZXR0ZXJtb2RlLmlvIiwidG9rZW5UeXBlIjoiVVNFUiIsImVudGl0eUlkIjpudWxsLCJwZXJtaXNzaW9uQ29udGV4dCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsInNlc3Npb25JZCI6Ijc0bkxybmROVDVEd3Ewd2M2UE5NY0J2Wk1mOEI4RmUwM09Sc21Qd2MySHZxZDdrdDRaIiwiaWF0IjoxNzI2Mjg4NjQ0LCJleHAiOjE3Mjg4ODA2NDR9.B2rqWSdP8594LfCNC_lZ7UJNKqYIk8qzvXFjdp9wG0w";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

declare global {
  interface Window {
    __BM_DATA__: any;
  }
}

export const apolloClientServer = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(globalThis.window?.__BM_DATA__),
  ssrMode: true,
});
