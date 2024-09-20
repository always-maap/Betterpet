import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BETTERMODE_BASEURL } from "@/apis/constants";

const httpLink = createHttpLink({
  uri: BETTERMODE_BASEURL,
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdVRVNUX2dnUlVNdXExcFBrUkVpNiIsIm5ldHdvcmtJZCI6IjdLTmFyQWVVZW8iLCJuZXR3b3JrRG9tYWluIjoiYmV0dGVycGV0LmJldHRlcm1vZGUuaW8iLCJ0b2tlblR5cGUiOiJHVUVTVCIsImVudGl0eUlkIjpudWxsLCJwZXJtaXNzaW9uQ29udGV4dCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsImlhdCI6MTcyNjM4MTc2MSwiZXhwIjoxNzI4OTczNzYxfQ.ogdre3fnqUjqDc6_2z8tG3SbUdnmRuXcTv0kZWBH2YE";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClientServer = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: true,
});
