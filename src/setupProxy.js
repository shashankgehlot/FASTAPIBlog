const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://fastapi:8000', // Your backend server
      changeOrigin: true,
    })
  );
};
