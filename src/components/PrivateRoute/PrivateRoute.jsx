import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getItem } from "../../helpers/sessionStorage";

const PrivateRoute = () => {
  const location = useLocation();

  const auth = getItem("user_token_streamy"); // determine if authorized

  return auth ? <Outlet /> : <Navigate to="/login" state={{ path: location.pathname }} />;
};

export default PrivateRoute;
