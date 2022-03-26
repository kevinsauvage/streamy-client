const config = {
  serverUrl: "https://streamy-v2-server.vercel.app/",
};

if (window.location.hostname === "localhost") {
  config.serverUrl = "http://localhost:5000/";
}

export default config;
