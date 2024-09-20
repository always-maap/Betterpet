import { useQuery } from "@apollo/client";

import { GetPostsQuery } from "@/apis/posts";

export function usePostsInfiniteQuery() {
  const { fetchMore, ...rest } = useQuery(GetPostsQuery, {
    variables: {
      limit: 6,
      spaceIds: ["KN5xnEEr00fs"],
      postTypeIds: ["gE2Qe4gq1SZ06qP"],
      orderByString: "publishedAt",
    },
    fetchPolicy: "cache-first",
  });

  const fetchMoreWithUpdateQuery = (endCursor: string) => {
    fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          posts: {
            ...fetchMoreResult.posts,
            nodes: [...prev.posts.nodes!, ...fetchMoreResult.posts.nodes!],
          },
        };
      },
    });
  };

  return {
    fetchMore: fetchMoreWithUpdateQuery,
    ...rest,
  };
}
