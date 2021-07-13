import React, { Component, ChangeEvent} from 'react';
import { Link } from 'react-router-dom';

import TutorialDataService from '../../services/tutorial.service';
import ITutorialData from '../../types/tutorial.type';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

type Props = {};
type State = {
    tutorials: Array<ITutorialData>,
    currentTutorial: ITutorialData | null,
    currentIndex: number,
    searchTitle: string
};

export default class TutorialListComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ''
        };
    }

    
    componentDidMount() {
        this.retrieveTutorials();            
    }

    onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
    }
    
    retrieveTutorials = () => {
        TutorialDataService.getAll().then(response => {
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }
    
    refreshList = () => {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }
    
    setActiveTutorial = (tutorial: ITutorialData, index: number) => {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }
    
    removeAllTutorials = () => {
        TutorialDataService.deleteAll().then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(e => {
            console.log(e);
        });
    }

    searchTitle = () => {
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });

        TutorialDataService.findByTitle(this.state.searchTitle).then(response => {
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                  <br />
                <TextField
                  name="search"
                  id="search"
                  label="Search by Title"
                  variant="outlined"
                  required
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.searchTitle}
                    style={{ marginTop: "3px", marginLeft: "7px", height: "50px", borderRadius: "5px" }}
                >
                  Search
                </Button>                
              </div>
            </div>
            <div className="col-md-6">
              <h4>Tutorials List</h4>
    
              <ul className="list-group">
                {tutorials &&
                  tutorials.map((tutorial: ITutorialData, index: number) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTutorial(tutorial, index)}
                      key={index}
                    >
                      {tutorial.title}
                    </li>
                  ))}
              </ul>

              <Button
                variant="contained"
                color="secondary"
                onClick={this.removeAllTutorials}
              >
                Remove All
              </Button> 
            </div>
            <div className="col-md-6">
              {currentTutorial ? (
                <div>
                  <h4>Tutorial</h4>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentTutorial.title}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentTutorial.description}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>
    
                  <Link
                    to={"/tutorials/" + currentTutorial.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Tutorial...</p>
                </div>
              )}
            </div>
          </div>
        );
    }
}