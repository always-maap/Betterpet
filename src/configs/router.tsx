import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/routes/home.page";
import { SignInPage } from "@/routes/auth/sign-in.page";
import { PostPage } from "@/routes/post/post.page";
import { NotFound } from "@/routes/not-found";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signin" element={<SignInPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
