import config from "../config";

const apiRoutes = {
  auth: `${config.serverUrl}auth`,
  users: `${config.serverUrl}users`,
  comment: `${config.serverUrl}comments`,
};
export default apiRoutes;
