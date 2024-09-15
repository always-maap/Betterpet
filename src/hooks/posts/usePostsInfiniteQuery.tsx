import { useQuery } from "@apollo/client";

import { POSTS } from "@/apis/posts";

export function usePostsInfiniteQuery() {
  return useQuery(POSTS);
}
