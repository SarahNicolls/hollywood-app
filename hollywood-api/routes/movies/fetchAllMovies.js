module.exports = {
  path: "/api/movies",
  method: "GET",
  handler: function(request, reply) {
    this.models.Movie
      .filter({})
      .getJoin({ actors: true })
      .then(result => reply(result))
      .catch(err => reply(err));
  }
};
// getJoin allows you to add an actor into the movie
