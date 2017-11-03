import React, { Component } from "react";
import api from "../api";
import {
  Button,
  Input,
  Dropdown,
  Header,
  Segment,
  Image
} from "semantic-ui-react";

class EditActor extends Component {
  constructor() {
    super();

    this.state = {
      actor: {
        gender: "female"
      }
    };
  }

  onInputChange = e => {
    e.persist();

    this.setState(state => {
      return {
        actor: {
          ...state.actor,
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

  onFormSubmit = e => {
    e.preventDefault();

    let actorId = this.props.match.params.actorId;
    api.actors.update(actorId, this.state.actor).then(() => {
      this.props.history.push(`/actors/${actorId}`);
    });
  };

  componentDidMount() {
    let actorId = this.props.match.params.actorId;
    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This is not the actor you are looking for", actor);
        actor = {};
        this.setState(state => {
          return {
            error: "Unable to fetch actor"
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
            Edit Actor
          </Header>
        </Segment>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <Input
              name={"image"}
              placeholder={"image"}
              onChange={this.onInputChange}
              type="text"
              value={this.state.actor.image}
            />
          </div>
          <br />
          <div>
            <Input
              name={"name"}
              placeholder={"Name"}
              onChange={this.onInputChange}
              type="text"
              value={this.state.actor.name}
            />
          </div>
          <br />

          <div>
            <Dropdown
              name={"gender"}
              placeholder="Select Gender"
              selection
              onChange={this.onSelectInputChange}
              defaultValue={this.state.actor.gender}
              options={[
                { text: "Female", value: "female" },
                { text: "Male", value: "male" }
              ]}
            />
          </div>
          <br />
          <div>
            <Input
              type="text"
              name={"born"}
              placeholder={"born"}
              value={this.state.actor.born}
              onChange={this.onInputChange}
            />
          </div>
          <br />
          <div>
            <Input
              type="text"
              name={"bio"}
              placeholder={"bio"}
              value={this.state.actor.bio}
              onChange={this.onInputChange}
            />
          </div>
          <br />
          <div>
            <Input
              type="text"
              name={"awards"}
              placeholder={"awards"}
              value={this.state.actor.awards}
              onChange={this.onInputChange}
            />
          </div>
          <br />
          <div>
            <Input
              type="text"
              name={"knownFor"}
              placeholder={"knownFor"}
              value={this.state.actor.knownFor}
              onChange={this.onInputChange}
            />
          </div>
          <br />

          <div>
            <Input
              min={1}
              name={"age"}
              placeholder={"Age"}
              onChange={this.onInputChange}
              type="number"
              value={this.state.actor.age}
            />
          </div>
          <br />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default EditActor;
