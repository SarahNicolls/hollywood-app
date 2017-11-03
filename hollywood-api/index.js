const hapi = require("hapi");
const server = new hapi.Server();
const api = require("./api");

server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    cors: true
  },
  router: {
    stripTrailingSlash: true
  }
});

// api has all our models/routes connected to it so we can use it here
server.register(
  [
    {
      register: api
    }
  ],
  () => {
    server.start(err => {
      if (err) {
        console.log(err);
      }
      console.log(`Server started at ${server.info.uri}`);
    });
  }
);
