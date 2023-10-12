import { useUser } from "@/auth/useUser";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const user = useUser();
  return user.user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
