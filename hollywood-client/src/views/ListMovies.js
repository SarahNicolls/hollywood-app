import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Header, Segment, Image } from "semantic-ui-react";

class ListMovies extends Component {
  constructor() {
    super();

    // setting intial state so that movies will go into an array
    // setting error to intially be false so that any of our error statement wont run
    this.state = {
      movies: [],
      error: false
    };
  }

  // when the component Mounts, we call our getAll fetch and say
  // if that movie does not exsist and if it doesn't equal 0 then it is not a movie
  // then set that movies data to an array,
  // reset the state to say that there is an error
  componentDidMount() {
    api.movies.getAll().then(movies => {
      if (!movies.length && movies.length !== 0) {
        console.log("Return value was not an array of movies", movies);
        movies = [];

        this.setState(state => {
          return {
            error: "unable to fetch movies. We are sorry"
          };
        });
      }
      // if no errors, resetting the state so that the movies array will be populated
      // with the new movies data that was returned from getAll
      this.setState(state => {
        return {
          movies: movies
        };
      });
    });
  }

  render() {
    let { movies, error } = this.state;

    return (
      <div style={{ padding: 10 }}>
        <Segment inverted>
          <Header style={{ height: 70, fontSize: 40 }} inverted color="grey">
            <Image
              style={{ height: 70, width: 70 }}
              src={
                "http://justinlinkmusic.com/wp-content/uploads/2017/01/imdb.png"
              }
            />
            Top Rated Movies
          </Header>
        </Segment>
        <Link style={{ float: "right" }} to={`/movies/new`}>
          New Movie
        </Link>
        {error && <div>{error}</div>}
        {movies.map(m => (
          <div style={{ padding: 5, fontSize: 20 }} key={m.id}>
            <Link to={`/movies/${m.id}`}>
              {m.title} - {m.actors.length} Actors
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ListMovies;
