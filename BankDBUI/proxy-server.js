const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

// Define a route to proxy requests to the backend server
app.all("/api/*", (req, res) => {
  // Add CORS headers to the response
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Proxy the request to the backend server
  proxy.web(req, res, { target: "http://localhost:8080" });
});

// Start the proxy server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
