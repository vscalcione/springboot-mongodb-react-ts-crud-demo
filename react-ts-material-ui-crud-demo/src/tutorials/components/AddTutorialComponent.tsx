import React, { Component, ChangeEvent } from "react";

import ITutorialData from "../types/tutorial.type";
import TutorialDataService from "../services/tutorial.service";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

type Props = {};
type State = ITutorialData & {
  submitted: boolean;
};

export default class AddTutorialComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }

  saveTutorial() {
    const data: ITutorialData = {
      title: this.state.title,
      description: this.state.description,
    };

    TutorialDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    const { submitted, title, description } = this.state;
    return (
      <>
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Button
                variant="contained"
                color="primary"
                onClick={this.newTutorial}
              >
                Add
              </Button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <br />
                <TextField
                  name="title"
                  id="title"
                  label="Title"
                  variant="outlined"
                  required
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="form-group">
                <br />
                <TextField
                  name="description"
                  id="description"
                  label="Description"
                  variant="outlined"
                  required
                  value={description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.saveTutorial}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </>
    );
  }
}
