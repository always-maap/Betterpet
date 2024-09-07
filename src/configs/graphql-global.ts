import { initGraphQLTada } from "gql.tada";
import type { introspection } from "../types/bettermode-global-env";

export const graphqlGlobal = initGraphQLTada<{
  introspection: introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
