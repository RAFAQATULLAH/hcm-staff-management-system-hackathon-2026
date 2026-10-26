import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();
  const token = localStorage.getItem("staffToken");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("staffUser") || "null");
  } catch {
    user = null;
  }

  if (!token || !user?.role || !["hr", "employee"].includes(user.role)) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "hr" ? "/hr/dashboard" : "/employee/dashboard"} replace />;
  }

  return <Outlet />;
}
