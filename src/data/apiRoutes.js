import config from "../config";

const apiRoutes = {
  login: `${config.serverUrl}login`,
  users: `${config.serverUrl}users`,
  comment: `${config.serverUrl}comments`,
};
export default apiRoutes;
