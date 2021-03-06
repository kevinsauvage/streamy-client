import { createContext } from "react";
import apiRoutes from "../data/apiRoutes";
import apiHelper from "../helpers/apiHelper";

export const AuthContext = createContext();

const { Provider } = AuthContext;

export const AuthProvider = (props) => {
  const login = async (email, password) => {
    return await apiHelper(apiRoutes.auth + "/login", { email, password });
  };

  const register = async (firstName, lastName, email, password) => {
    return await apiHelper(apiRoutes.auth + "/register", { firstName, lastName, email, password });
  };

  const value = { login, register };

  return <Provider value={value}>{props.children}</Provider>;
};
