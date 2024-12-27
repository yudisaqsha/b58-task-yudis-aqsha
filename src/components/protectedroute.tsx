import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/newAuthStore";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute() {
  const {token}  = useAuthStore();

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded: { exp: number } = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }
}


export default ProtectedRoute;
