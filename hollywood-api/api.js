const routes = require("./routes");
const models = require("./models");
// importing our rotes/models folders so that we can use them in our main index.js

module.exports.register = function(server, options, next) {
  server.bind({
    models: models
  });
  server.route(routes);
  return next();
};

module.exports.register.attributes = {
  name: "api",
  version: "1.0.0"
};
