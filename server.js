const PORT = 5000;

const fastify = require('fastify')({logger: true});

fastify.register(require('./routes/routes'));

fastify.register(require('@fastify/swagger'),{
    swagger:{
        info:{ title: 'fastify-api'},
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "Default", description: "Default" }],
    }
});


fastify.register(require('@fastify/swagger-ui'),{
    exposeRoute: true,
    routePrefix: '/docs',
})


fastify.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    function (req, body, done) {
      try {
        var newBody = {
          raw: body,
          parsed: JSON.parse(body),
        };
        done(null, newBody);
      } catch (error) {
        error.statusCode = 400;
        done(error, undefined);
      }
    }
  );




fastify.listen(
    {
        port: PORT, // Pulled from env file.
        host: "localhost",
    },
    (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    }
);