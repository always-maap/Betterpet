import { BETTERCAT_BASEURL } from "./constants";

export async function signIn(email: string, password: string) {
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
