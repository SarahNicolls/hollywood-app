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

class CreateActor extends Component {
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

    api.actors.create(this.state.actor).then(() => {
      this.props.history.push("/actors");
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
            Create An Actor
          </Header>
        </Segment>
        <form onSubmit={this.onFormSubmit}>
          <div style={{ padding: 10 }}>
            <div>
              <Input
                name={"image"}
                placeholder={"image"}
                onChange={this.onInputChange}
                type="text"
              />
            </div>
            <br />
            <div>
              <Input
                name={"name"}
                placeholder={"Name"}
                onChange={this.onInputChange}
                type="text"
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
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"bio"}
                placeholder={"bio"}
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"awards"}
                placeholder={"awards"}
                onChange={this.onInputChange}
              />
            </div>
            <br />
            <div>
              <Input
                type="text"
                name={"knownFor"}
                placeholder={"knownFor"}
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

export default CreateActor;
