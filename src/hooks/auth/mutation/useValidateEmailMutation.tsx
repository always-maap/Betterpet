import { useMutation } from "@apollo/client";

import { AuthFormValidateEmailMutation } from "@/apis/auth";

export function useValidateEmailMutation() {
  return useMutation(AuthFormValidateEmailMutation, {
    context: { apiName: "global" },
  });
}
