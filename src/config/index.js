const config = {
  serverUrl: 'https://streamy-server.onrender.com/',
};

if (window.location.hostname === 'localhost') {
  config.serverUrl = 'http://localhost:5000/';
}

export default config;
