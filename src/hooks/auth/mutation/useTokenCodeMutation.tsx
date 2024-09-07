import { useMutation } from "@apollo/client";

import { AuthFormRequestGlobalTokenCodeMutation } from "@/apis/auth";

export function useTokenCodeMutation() {
  return useMutation(AuthFormRequestGlobalTokenCodeMutation, {
    context: { apiName: "global" },
  });
}
