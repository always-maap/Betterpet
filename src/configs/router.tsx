import { createBrowserRouter } from "react-router-dom";

import HomePage from "@/routes/home.page";
import SignInPage from "@/routes/auth/sign-in.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/signin",
    element: <SignInPage />,
  },
]);
