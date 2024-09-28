import { Navigate } from "react-router-dom";
import { FeedbackPage } from "../pages/FeedbackPage/FeedbackPage";

export const feedbackRoutes = [
  {
    path: "/",
    element: <FeedbackPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];
