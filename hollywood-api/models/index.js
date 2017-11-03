const thinky = require("thinky");
const config = require("../config");

const db = thinky({
  db: config.db.name,
  port: config.db.port,
  host: config.db.host
});

const Actor = require("./actor")(db);
const Movie = require("./movie")(db);
// requiring actor and movie from our files

Movie.hasAndBelongsToMany(Actor, "actors", "id", "id");
Actor.hasAndBelongsToMany(Movie, "movies", "id", "id");
// Movie allows us to have relations with an actor
// Actor allows us to have relations with a movie

module.exports = {
  Actor: Actor,
  Movie: Movie
};

// exporting our required fields
