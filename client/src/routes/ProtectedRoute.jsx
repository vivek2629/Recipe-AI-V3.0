import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
