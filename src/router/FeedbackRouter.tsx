import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { authRoutes } from "../auth/routes/authRoutes";
import { feedbackRoutes } from "../feedback/routes/feedbackRoutes";
// import { CheckingAuth } from "../ui/components/CheckingAuth/CheckingAuth";

export const FeedbackRouter = () => {
  const { status } = useCheckAuth();

  // if (status === "checking") return null;

  const routes: RouteObject[] = [];

  if (status !== "authenticated") {
    routes.push({
      path: "auth/*",
      children: [...authRoutes],
    });
  }

  if (status === "authenticated") {
    routes.push({
      path: "/",
      children: [...feedbackRoutes],
    });
  }

  routes.push({
    path: "*",
    element: <Navigate to={status !== "authenticated" ? "/auth/login" : "/"} />,
  });

  const router = createBrowserRouter(routes);

  // const authPath =
  //   status !== "authenticated"
  //     ? {
  //         path: "auth/*", //rutas hijas {login}
  //         Children: [...authRoutes],
  //       }
  //     : {};

  // const dashboardPath =
  //   status === "authenticated"
  //     ? {
  //         path: "/", //dashboard se encuentra en raiz /
  //         children: [...feedbackRoutes],
  //       }
  //     : {};

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     children: [
  //       authPath,
  //       dashboardPath,
  //       {
  //         path: "/",
  //         element: <Navigate to={"/auth/login"} />,
  //         children: [
  //           {
  //             path: "*",
  //             element: <Navigate to={"/"} />,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  return <RouterProvider router={router}></RouterProvider>;
};
