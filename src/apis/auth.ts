import { BETTERCAT_BASEURL } from "./constants";
import { graphql } from "../configs/graphql";

export async function login(email: string, password: string) {
  return await fetch(`${BETTERCAT_BASEURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authType: "user-pass",
      method: "",
      usernameOrEmail: email,
      password,
    }),
  });
}

// export const LoginNetowrkMutation = graphql`

// `;
