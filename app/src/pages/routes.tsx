import { createBrowserRouter } from "react-router-dom";
import Auth from "./auth";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
