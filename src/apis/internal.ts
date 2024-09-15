export async function signIn(email: string, password: string) {
  const res = await fetch(`/apis/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return res.json();
}
