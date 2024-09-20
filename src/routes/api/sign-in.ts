import cookie from "cookie";
import invariant from "tiny-invariant";

import { login } from "@/apis/auth";
import { Request, Response } from "server";

export async function GET(req: Request, res: Response) {
  const { email, password } = req.body;

  const signInResp = await login(email, password);

  invariant(signInResp.ok, "Failed to sign in");

  const setCookie = signInResp.headers.get("set-cookie");
  invariant(setCookie, "No cookie set on sign in");

  const token = cookie.parse(setCookie).c_access_token;

  return res.json({ email, password, token }).send();
}
