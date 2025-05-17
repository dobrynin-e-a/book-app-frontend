import { Navigate, Outlet } from "react-router";

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin" />;
  }

  return children ? children : <Outlet />;
};
