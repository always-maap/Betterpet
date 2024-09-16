import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/routes/home.page";
import { SignInPage } from "@/routes/auth/sign-in.page";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/signin" element={<SignInPage />} />
    </Routes>
  );
}
