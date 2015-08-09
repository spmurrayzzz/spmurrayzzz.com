var Hapi = require('hapi'),
  server = new Hapi.Server({
    connections: {
      router: {
        stripTrailingSlash: true
      }
    }
  }),
  routes = require('./lib/routes');

server.connection({ port: 3000 });

routes.init( server );

server.start(function() {
  console.log('Server started.');
});
