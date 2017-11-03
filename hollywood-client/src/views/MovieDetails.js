import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Button } from "semantic-ui-react";

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      error: false
    };
  }

  // calling that specific movie by it's url id
  // if that movie does not exsist, stating it to the user
  componentDidMount() {
    let movieId = this.props.match.params.movieId;
    api.movies.getById(movieId).then(movie => {
      if (!movie.id) {
        console.log("This is not the movie you were looking for", movie);
        movie = {};

        this.setState(state => {
          return {
            error: "unable to fetch movie"
          };
        });
      }
      // resetting the state to have movie: to equal whatever movie data you got back
      this.setState(state => {
        return {
          movie: movie
        };
      });
    });
  }

  render() {
    let { movie, error } = this.state;
    return (
      <div style={{ padding: 15 }}>
        <Segment inverted>
          <Header style={{ height: 70, fontSize: 40 }} inverted color="grey">
            <Image
              style={{ height: 70, width: 70 }}
              src={
                "http://justinlinkmusic.com/wp-content/uploads/2017/01/imdb.png"
              }
            />
            Movie Details
          </Header>
        </Segment>
        {error && <div>{error}</div>}
        {!error && (
          <div>
            <Button as={Link} to={`/movies/${movie.id}/edit`}>
              Edit
            </Button>

            <h1>{movie.title} (2017)</h1>
            <div>
              <img
                style={{ height: 400 }}
                src={movie.poster}
                alt={"Movie Poster"}
              />
            </div>
            <h2>Genre</h2>
            <div>{movie.genre}</div>
            <hr />

            <h2>Ratings</h2>

            <div>
              <span style={{ fontWeight: "bold" }}>Rating: </span>
              {movie.rating}
            </div>
            <div>
              <img
                style={{ height: 40 }}
                src="https://static1.squarespace.com/static/52c73afae4b020108628b294/534a9154e4b03c03e0798627/534a9178e4b03c03e0798641/1490879019484/?format=500w"
                alt=""
              />
              {movie.rottenTomatoes}%
            </div>
            <hr />
            <h2>Cast</h2>
            {movie.actors &&
              movie.actors.map(actor => (
                <div key={actor.id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 5
                    }}
                  >
                    <img
                      style={{ height: 100 }}
                      src={actor.image}
                      label={actor.name}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Age: </span>
                        {actor.age}
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Born: </span>
                        {actor.born}
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Awards: </span>
                        {actor.awards}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <hr />
            <h2>Details</h2>
            <p>
              <span style={{ fontWeight: "bold" }}>Summary: </span>
              {movie.summary}
            </p>
            <div>
              <span style={{ fontWeight: "bold" }}>Language: </span>
              {movie.language}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Country: </span>
              {movie.country}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Release Date: </span>
              {movie.releaseDate}
            </div>
            <hr />
            <h2>Box Office</h2>
            <div>
              <span style={{ fontWeight: "bold" }}>Budget: </span>
              {movie.budget}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Opening Weekend: </span>
              {movie.openingWknd}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetails;

// line 57, calling actors as a field on movies, actors is an array of objects
// so we have to map through that array to get what we want our of it
