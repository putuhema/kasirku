import { useAuth } from "@/auth/useAuth";
import { Navigate, Outlet } from "react-router";
import Layout from "./Layout";

const PrivateRoutes = ({ nav = true }: { nav?: boolean }) => {
  const user = useAuth();
  return user ? (
    <>
      {nav ? (
        <>
          <Layout />
        </>
      ) : (
        <Outlet />
      )}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
