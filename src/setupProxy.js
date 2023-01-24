const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    [
      '/api/user/login',
      '/api/messages',
      '/api/delete/message',
      '/api/read/message',
      '/api/add/message',
      '/api/send/messages',
    ],

    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};