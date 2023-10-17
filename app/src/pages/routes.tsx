import { createBrowserRouter } from "react-router-dom";
import Auth from "./auth";
import PrivateRoutes from "./PrivateRoutes";
import Home from "./home/Home";
import ForgotPassword from "@/components/ForgotPassword";
import ResetPassword from "@/components/ResetPassword";
import Settings from "./users/Settings";
import Dashboard from "./dashboard/Dashboard";
import Transaction from "./dashboard/Transaction";
import Layout from "./dashboard/Layout";
import Report from "./dashboard/Report";
import Users from "./dashboard/users/Users";
import EditUserPage from "./dashboard/EditUserPage";
import Admin from "./dashboard/users/Admin";
import Products from "./dashboard/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/req-reset-pwd",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes nav={false} />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "transactions",
            element: <Transaction />,
          },
          {
            path: "reports",
            element: <Report />,
          },
          {
            path: "users/cashier",
            element: <Users />,
          },
          {
            path: "users/admin",
            element: <Admin />,
          },
          {
            path: "users/edit/:userId",
            element: <EditUserPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
