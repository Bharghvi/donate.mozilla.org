module.exports = function getServerOptions(options) {
  options = options || {};

  return {
    address: process.env.HOST,
    port: process.env.PORT,
    uri: process.env.APPLICATION_URI,
    routes: {
      security: {
        hsts: {
          maxAge: 15768000,
          includeSubDomains: true,
          preload: true
        },
        xframe: process.env.ENABLE_XFRAMEOPTIONS === 'true',
        xss: true,
        noOpen: true,
        noSniff: true
      }
    }
  };
};
