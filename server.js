require('habitat').load();
var Path = require('path');

var Hapi = require('hapi');
var Good = require('good');
var React = require('react');
require('node-jsx').install();

var server = new Hapi.Server();
server.connection({
  host: process.env.HOST,
  port: process.env.PORT
});

var stripeKeys = {
  publishableKey: 'pk_test_BZ0QTIwe7BVAk1ZDxOgWZ9Z6',
  // This is just a test key right now, nothing secret about it.
  secretKey: 'sk_test_HbsdaR1Bn5I84vdezKa9VcvA'
}

var stripe = require('stripe')(stripeKeys.secretKey);

server.route([
  {
     method: 'GET',
     path: '/public/{params*}',
     handler: {
       directory: {
         path: Path.join(__dirname, 'public')
       }
     }
  }, {
    method: 'GET',
    path: '/{page*}',
    handler: function(request, reply) {
      var Index = React.createFactory(require('./pages/index.jsx'));
      var Page;
      try {
        Page = React.createFactory(require('./pages/' + request.params.page + '.jsx'));
      } catch (ex) {
        // Meep?
        console.log(ex);
        return reply(404);
      }

      reply(React.renderToString(Index({
        markup: React.renderToString(Page())
      })));
    }
  },{
    method: 'POST',
    path: '/stripe',
    handler: function(request, reply) {
      // obtain StripeToken
      var transaction = request.payload;

      var stripeToken = transaction.stripeToken;
      // create charge

      var charge = {
        // stripe works in cents
        amount: transaction.amount_other * 100,
        currency: 'USD',
        card: stripeToken
      };
      stripe.charges.create(charge,
        function(err, charge) {
          if (err) {
            console.log(err);
          } else {
            reply(charge);
            console.log('Successful charge sent to Stripe!');
          }
        }       
      );
    }
  }
]);

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
