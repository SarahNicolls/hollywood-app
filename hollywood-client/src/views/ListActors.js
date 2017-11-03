import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Button } from "semantic-ui-react";

class ListActors extends Component {
  constructor() {
    super();

    this.state = {
      actors: [],
      error: false
    };
  }

  componentDidMount() {
    api.actors.getAll().then(actors => {
      if (!actors.length && actors.length !== 0) {
        console.log("Return value was not an array of actors", actors);
        actors = [];

        this.setState(state => {
          return {
            error: "unable to fetch actors. We are sorry"
          };
        });
      }

      this.setState(state => {
        return {
          actors: actors
        };
      });
    });
  }

  render() {
    let { actors, error } = this.state;

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
            Top Rated Actors
          </Header>
        </Segment>

        <Button as={Link} to={"/actors/new"}>
          Create New Actor
        </Button>
        {error && <div>{error}</div>}
        {actors.map(a => (
          <div style={{ padding: 5 }} key={a.id}>
            <Link to={`/actors/${a.id}`}>
              {a.name} - {a.movies.length} Movies
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ListActors;
