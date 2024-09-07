import { graphql } from "../configs/graphql";

export const POSTS = graphql(`
  query Posts {
    posts(limit: 10) {
      totalCount
      pageInfo {
        hasNextPage
      }
    }
  }
`);
