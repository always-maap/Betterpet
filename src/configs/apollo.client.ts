import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BETTERMODE_BASEURL } from "../apis/constants";

const httpLink = createHttpLink({
  uri: BETTERMODE_BASEURL,
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlcyMktWVGpweDciLCJuZXR3b3JrSWQiOiI3S05hckFlVWVvIiwibmV0d29ya0RvbWFpbiI6ImJldHRlcnBldC5iZXR0ZXJtb2RlLmlvIiwidG9rZW5UeXBlIjoiVVNFUiIsImVudGl0eUlkIjpudWxsLCJwZXJtaXNzaW9uQ29udGV4dCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsInNlc3Npb25JZCI6IlFGaUZ4a1JZUGltcHRkT25DTk9ZMndlQjFzRjRCZmZuTjdDOG9pUVNwMEtHSTN3V201IiwiaWF0IjoxNzI2ODU2MjA2LCJleHAiOjE3Mjk0NDgyMDZ9.7vQrcdxNh22yvAyK2M-jAr40AfpGU2oUV3ddgUPcwBk";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

declare global {
  interface Window {
    __BP_DATA__: any;
  }
}
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(window.__BP_DATA__),
});
