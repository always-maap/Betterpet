import { useQuery } from "@apollo/client";

import { GetPostQuery } from "@/apis/posts";

export function usePostQuery(id: string) {
  return useQuery(GetPostQuery, {
    variables: {
      id,
    },
  });
}
