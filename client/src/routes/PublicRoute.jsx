import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ element }) => {
  const token = Cookies.get("jwt_token");
  if (token !== undefined) {
    return <Navigate to="/chat" replace />;
  }
  return element;
};

export default PublicRoute;
