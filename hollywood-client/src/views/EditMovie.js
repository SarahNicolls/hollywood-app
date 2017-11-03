import React, { Component } from "react";
import api from "../api";
import {
  Input,
  Button,
  Dropdown,
  Header,
  Segment,
  Image
} from "semantic-ui-react";

class EditMovie extends Component {
  constructor() {
    super();

    this.state = {
      actors: [],
      error: false,
      movie: {
        rating: "G"
      }
    };
  }

  onInputChange = e => {
    e.persist();

    this.setState(state => {
      return {
        movie: {
          ...state.movie,
          [e.target.name]: e.target.value
        }
      };
    });
  };

  // making a new InputChange for dropdown
  onSelectInputChange = (e, data) => {
    e.persist();

    console.log(data);

    this.setState(state => {
      return {
        actor: {
          ...state.actor,
          [data.name]: data.value
        }
      };
    });
  };

  // when we submit form, pushing the user back to that movies Detail's page
  onFormSubmit = e => {
    e.preventDefault();

    let movieId = this.props.match.params.movieId;

    api.movies.update(movieId, this.state.movie).then(() => {
      this.props.history.push(`/movies/${movieId}`);
    });
  };

  // creating a function that gets a Movie by its specific id
  // if movie does not exsist, telling the user by the error
  fetchMovieAndActors = () => {
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
      // resetting the state to equal that specific movie data
      this.setState(state => {
        return {
          movie: movie
        };
      });
      // getting all the actors from it's fetch call
      api.actors.getAll().then(actors => {
        if (!actors.length && actors.length !== 0) {
          return;
        }
        // resetting the state to equal whatever actor data it is bringing back
        this.setState(state => {
          return {
            actors: actors
          };
        });
      });
    });
  };

  componentDidMount() {
    this.fetchMovieAndActors();
  }

  // when we click our button, we add an Actor to that specific movie
  // we set an id: object on it from the specific actor id from the map
  addToCast = id => {
    let movieId = this.props.match.params.movieId;
    api.movies.addActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    });
  };

  // delete that specific actor from that specific movie
  removeFromCast = id => {
    let movieId = this.props.match.params.movieId;
    api.movies.removeActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    });
  };

  render() {
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
            Movie Details
          </Header>
        </Segment>
        <form style={{ padding: 10 }} onSubmit={this.onFormSubmit}>
          <div>
            <div style={{ margin: 15 }}>
              <Input
                name={"title"}
                placeholder={"Title"}
                onChange={this.onInputChange}
                type="text"
                value={this.state.movie.title}
              />
              <Input
                type="text"
                name={"genre"}
                placeholder={"Genre"}
                value={this.state.movie.genre}
                onChange={this.onInputChange}
              />

              <Dropdown
                name={"rating"}
                placeholder="Select Rating"
                selection
                onChange={this.onSelectInputChange}
                defaultValue={this.state.movie.rating}
                options={[
                  { text: "G", value: "G" },
                  { text: "PG", value: "PG" },
                  { text: "PG-13", value: "PG-13" },
                  { text: "R", value: "R" },
                  { text: "NR", value: "NR" }
                ]}
              />
            </div>

            <div style={{ margin: 15 }}>
              <Input
                min={0}
                max={100}
                name={"rottenTomatoes"}
                placeholder={"rottenTomatoes"}
                onChange={this.onInputChange}
                type="number"
                value={this.state.movie.rottenTomatoes}
              />
              <Input
                name={"poster"}
                placeholder={"Poster"}
                onChange={this.onInputChange}
                type="text"
                value={this.state.movie.poster}
              />
              <Input
                name={"summary"}
                placeholder={"Summary"}
                onChange={this.onInputChange}
                type="text"
                value={this.state.movie.summary}
              />
              <Input
                type="text"
                name={"language"}
                value={this.state.movie.language}
                placeholder={"Language"}
                onChange={this.onInputChange}
              />
            </div>
            <div style={{ margin: 15 }}>
              <Input
                type="text"
                name={"country"}
                value={this.state.movie.country}
                placeholder={"country"}
                onChange={this.onInputChange}
              />
              <Input
                type="text"
                name={"releaseDate"}
                value={this.state.movie.releaseDate}
                placeholder={"releaseDate"}
                onChange={this.onInputChange}
              />
              <Input
                type="text"
                name={"budget"}
                placeholder={"budget"}
                value={this.state.movie.budget}
                onChange={this.onInputChange}
              />
              <Input
                type="text"
                name={"openingWknd"}
                placeholder={"openingWknd"}
                value={this.state.movie.openingWknd}
                onChange={this.onInputChange}
              />
            </div>

            <div>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
        <hr />
        <h2>Actors</h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <h3>Current Cast</h3>
            {this.state.movie.actors &&
              this.state.movie.actors.map(a => (
                <div>
                  {a.name}
                  <Button
                    size={"tiny"}
                    onClick={() => this.removeFromCast(a.id)}
                  >
                    Fire
                  </Button>
                </div>
              ))}
          </div>
          <div style={{ flex: 1 }}>
            <h3>Cast To Hire</h3>
            {this.state.actors &&
              this.state.actors.map(a => (
                <div>
                  {a.name}
                  <Button size={"tiny"} onClick={() => this.addToCast(a.id)}>
                    Cast
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default EditMovie;
