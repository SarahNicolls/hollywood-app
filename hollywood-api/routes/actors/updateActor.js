module.exports = {
  path: "/api/actors/{actorId}",
  method: ["PUT", "PATCH"],
  handler: function(request, reply) {
    let actorId = request.params.actorId;

    this.models.Actor
      .get(actorId)
      .then(result =>
        result
          .merge(request.payload)
          .save()
          .then(result => reply(result))
      )
      .catch(err => reply(err));
  }
};
