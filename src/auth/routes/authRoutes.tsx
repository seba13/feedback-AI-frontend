import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { envs } from "../../config/envs";
// import { LoginPage } from "../pages/LoginPage/LoginPage";

export const authRoutes = [
  {
    path: "login",
    element: (
      <GoogleOAuthProvider clientId={envs.clientId}>
        <LoginPage />
      </GoogleOAuthProvider>
    ),
  },
  {
    path: "*",
    element: <Navigate to={"login"} />,
  },
];
