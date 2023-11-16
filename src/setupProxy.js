const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/titles",
    createProxyMiddleware({
      target: "https://niki3d.pythonanywhere.com/",
      changeOrigin: true,
    })
  );
};
