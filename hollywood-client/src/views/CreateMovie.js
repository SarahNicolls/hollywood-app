import React, { Component } from "react";
import {
  Button,
  Input,
  Dropdown,
  Header,
  Segment,
  Image
} from "semantic-ui-react";
import api from "../api";
// ../api means that it goes up one folder

class CreateMovie extends Component {
  constructor() {
    super();

    // setting an initial state of movie, and setting the rating to G so that if
    // someone rates a movie "G" it will actually post
    this.state = {
      movie: {
        rating: "G"
      }
    };
  }

  // setting the state to fill from whatever the User types into the Inputs
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

  // calling create from api.movies and pushing the user to the list movies page
  onFormSubmit = e => {
    e.preventDefault();

    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies");
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
            Create A Movie
          </Header>
        </Segment>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <div>
              <Input
                name={"title"}
                placeholder={"Title"}
                onChange={this.onInputChange}
                type="text"
              />
            </div>
            <br />
            <div>
              {" "}
              <Input
                type="text"
                name={"genre"}
                placeholder={"Genre"}
                onChange={this.onInputChange}
              />
            </div>
            <br />

            <div>
              {" "}
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
            <br />

            <div>
              {" "}
              <Input
                min={0}
                max={100}
                name={"rottenTomatoes"}
                placeholder={"Score"}
                onChange={this.onInputChange}
                type="number"
              />
            </div>
            <br />
            <div>
              {" "}
              <Input
                name={"poster"}
                placeholder={"Poster"}
                onChange={this.onInputChange}
                type="text"
              />
            </div>
            <br />
            <div>
              <Input
                name={"summary"}
                placeholder={"Summary"}
                onChange={this.onInputChange}
                type="text"
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"language"}
                placeholder={"Language"}
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"country"}
                placeholder={"country"}
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"releaseDate"}
                placeholder={"releaseDate"}
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"budget"}
                placeholder={"budget"}
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"openingWknd"}
                placeholder={"openingWknd"}
                onChange={this.onInputChange}
              />
            </div>
            <br />

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateMovie;
