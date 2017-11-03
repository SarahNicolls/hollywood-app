import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Header, Segment, Image } from "semantic-ui-react";

class ActorDetails extends Component {
  constructor() {
    super();

    this.state = {
      actor: {},
      error: false
    };
  }

  componentDidMount() {
    let actorId = this.props.match.params.actorId;
    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This is not the actor you were looking for", actor);
        actor = {};

        this.setState(state => {
          return {
            error: "unable to fetch actor"
          };
        });
      }

      this.setState(state => {
        return {
          actor: actor
        };
      });
    });
  }

  render() {
    let { actor, error } = this.state;
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
            Actor Details
          </Header>
        </Segment>

        {error && <div>{error}</div>}
        {!error && (
          <div>
            <Link to={`/actors/${actor.id}/edit`}>Edit</Link>

            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <img style={{ height: 300 }} src={actor.image} />
              </div>
              <div style={{ flex: 5, padding: 20, margin: 30 }}>
                <h3>{actor.name}</h3>
                <div>{actor.gender}</div>

                <div>Age: {actor.age}</div>
                <div>
                  <br />
                  <p>{actor.bio}</p>

                  <div>Born: {actor.born}</div>
                </div>
              </div>
            </div>
            <hr />
            <h2>Awards</h2>
            <div>{actor.awards}</div>
            <hr />
            <h2>Movies</h2>
            {actor.movies &&
              actor.movies.map(m => (
                <div style={{ display: "flex", padding: 5 }}>
                  <img style={{ height: 100 }} src={m.poster} alt="" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Link to={`/movies/${m.id}`}>{m.title}</Link>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Rating: </span>
                      {m.rating}
                    </div>
                  </div>
                </div>
              ))}
            <hr />
            <h2>Also Known For</h2>
            <div>
              <img
                style={{ height: 300 }}
                src={actor.knownFor}
                alt="Actor Movie"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ActorDetails;
