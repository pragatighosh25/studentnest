import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedOwnerRoute() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  // Not logged in or not an owner
    if (!auth) {
    return null;
  }
   if (auth.role !== "owner") {
    return <Navigate to="/owner/login" replace />;
  }

  // Authorized
  return <Outlet />;
}
