const config = {
  serverUrl: "https://ancient-fortress-34615.herokuapp.com/",
};

if (window.location.hostname === "localhost") {
  config.serverUrl = "http://localhost:5000/";
}

export default config;
