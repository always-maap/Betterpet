import { Router } from "express";
import cookie from "cookie";
import invariant from "tiny-invariant";

import { signIn } from "@/apis/auth";

export const authRouter = Router();

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const signInResp = await signIn(email, password);

  invariant(signInResp.ok, "Failed to sign in");

  const setCookie = signInResp.headers.get("set-cookie");
  invariant(setCookie, "No cookie set on sign in");

  const token = cookie.parse(setCookie).c_access_token;

  return res.json({ email, password, token });
});
