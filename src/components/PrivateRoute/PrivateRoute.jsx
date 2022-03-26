import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../../helpers/sessionStorage";

const PrivateRoute = () => {
  const auth = getItem("user_token"); // determine if authorized
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
