const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://88.222.213.152:8000', // Your backend server
      changeOrigin: true,
    })
  );
};
