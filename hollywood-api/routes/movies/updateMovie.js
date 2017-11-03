module.exports = {
  path: "/api/movies/{movieId}",
  method: ["PUT", "PATCH"],
  handler: function(request, reply) {
    let movieId = request.params.movieId;

    this.models.Movie
      .get(movieId)
      .then(result =>
        result
          .merge(request.payload)
          .save()
          .then(result => reply(result))
      )
      .catch(err => reply(err));
  }
};

// updating Movie
