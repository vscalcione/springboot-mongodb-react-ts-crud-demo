import React, { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import TutorialDataService from "../../services/tutorial.service";
import ITutorialData from "../../types/tutorial.type";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;
type State = {
  currentTutorial: ITutorialData;
  message: string;
};

export default class TutorialComponent extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount = () => {
    this.getTutorial(this.props.match.params.id);
  };

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  };

  onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  };

  getTutorial = (id: string) => {
    TutorialDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentTutorial: response.data,
        });
        console.log(response.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  updatePublished = (status: boolean) => {
    const data: ITutorialData = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status,
    };

    TutorialDataService.update(data, this.state.currentTutorial.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
          message: "The status was updated successfully",
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updateTutorial = () => {
    TutorialDataService.update(
      this.state.currentTutorial,
      this.state.currentTutorial.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  deleteTutorial = () => {
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/tutorials");
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <br />
                <TextField
                  name="title"
                  id="title"
                  label="Title"
                  variant="outlined"
                  required
                  value={currentTutorial.title}
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
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <br />
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.updatePublished(false)}
                className="margin-top-form"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                UnPublish  
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.updatePublished(true)}
                style={{ marginTop: "10px" }}
              >
                Publish  
              </Button>
            )}

            <Button 
              variant="contained" 
              color="secondary"
              onClick={this.deleteTutorial}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Delete
            </Button>

            <Button 
              variant="contained"
              onClick={this.updateTutorial}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Update
            </Button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    )
  }
}
