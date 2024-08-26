import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/common";

const ProtectedRoutes = ({ allowedRole }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  let isAuth = useAuth();
//   return <Outlet />
  if (allowedRole) {
    return isAuth ? (
      allowedRole.indexOf(role) > -1 ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" state={{ from: location }} replace />
      )
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  } else {
    return isAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
};

export default ProtectedRoutes;
