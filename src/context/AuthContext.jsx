import { createContext } from "react";
import apiRoutes from "../data/apiRoutes";
import apiHelper from "../helpers/apiHelper";

export const AuthContext = createContext();

const { Provider } = AuthContext;

export const AuthProvider = (props) => {
  const login = async (email, password) => {
    return await apiHelper(apiRoutes.login, { email, password });
  };

  const value = { login };

  return <Provider value={value}>{props.children}</Provider>;
};
