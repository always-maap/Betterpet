import { graphqlGlobal } from "../configs/graphql-global";
import { BETTERCAT_BASEURL } from "./constants";

export const AuthFormValidateEmailMutation = graphqlGlobal(`
  mutation AuthFormValidateEmailMutation($input: RequestGlobalTokenInput!) {
    validateEmail(input: $input) {
      valid
      suggestion
    }
  }
`);

export const AuthFormRequestGlobalTokenCodeMutation = graphqlGlobal(` 
    mutation AuthFormRequestGlobalTokenCodeMutation(
      $input: RequestGlobalTokenInput!
    ) {
      requestGlobalTokenCode(input: $input) {
        status
      }
    }
`);

export async function signIn() {
  return await fetch(`${BETTERCAT_BASEURL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authType: "user-pass",
      redirect: "/",
      method: "",
      usernameOrEmail: "mohammadali.ap.2000@gmail.com",
      password: "TuR1NG_1379",
    }),
  });
}
