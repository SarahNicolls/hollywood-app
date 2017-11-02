import React, { Component } from "react";
import api from "../api";

class CreateMovie extends Component {
  constructor() {
    super();

    this.state = {
      movie: {}
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

  onFormSubmit = e => {
    e.preventDefault();

    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies");
    });
  };

  render() {
    return (
      <div>
        <h1>CreateMovie</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            name={"title"}
            placeholder={"Title"}
            onChange={this.onInputChange}
            type="text"
          />
          <input
            name={"rating"}
            placeholder={"Rating"}
            onChange={this.onInputChange}
            type="text"
          />
          <input
            min={0}
            max={100}
            name={"rottenTomatoes"}
            placeholder={"rottenTomatoes"}
            onChange={this.onInputChange}
            type="number"
          />
          <input
            name={"poster"}
            placeholder={"Poster"}
            onChange={this.onInputChange}
            type="text"
          />
          <input
            name={"summary"}
            placeholder={"Summary"}
            onChange={this.onInputChange}
            type="text"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateMovie;
