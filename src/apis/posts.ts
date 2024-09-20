import { graphql } from "../configs/graphql";

export const GetPostsQuery = graphql(`
  query GetPosts($limit: Int!, $orderByString: String, $postTypeIds: [String!], $spaceIds: [ID!], $after: String) {
    posts(limit: $limit, after: $after, spaceIds: $spaceIds, postTypeIds: $postTypeIds, orderByString: $orderByString) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        title
        description
        slug
        thumbnail {
          ... on Image {
            id
            url
            width
            height
          }
        }
      }
    }
  }
`);

export const GetPostQuery = graphql(`
  query GetPost($id: ID!) {
    post(id: $id) {
      fields {
        key
        value
      }
      createdAt
      createdBy {
        member {
          name
          profilePicture {
            ... on Image {
              id
              url
              width
              height
            }
          }
        }
      }
      reactions {
        count
        reaction
        reacted
      }
    }
  }
`);
