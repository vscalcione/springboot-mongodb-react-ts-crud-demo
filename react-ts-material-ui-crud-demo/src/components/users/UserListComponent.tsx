import { Component, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import UserDataService from '../../services/user.service';
import IUserData from '../../types/user.type';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

type Props = {};
type State = {
    users: Array<IUserData>,
    currentUser: IUserData | null
    currentIndex: number,
    searchUsername: string
};

export default class UserListComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUsers = this.setActiveUsers.bind(this);
        this.removeAllUsers = this.removeAllUsers.bind(this);
        this.searchUsername = this.searchUsername.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchUsername: ''
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    onChangeSearchUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const searchUsername = e.target.value;
        this.setState({
            searchUsername: searchUsername
        });
    }
    
    retrieveUsers = () => {
        UserDataService.getAll().then(response => {
            this.setState({
                users: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        })
    }

    refreshList = () => {
        this.retrieveUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }

    setActiveUsers = (user: IUserData, index: number) => {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
    }

    removeAllUsers = () => {
        UserDataService.deleteAll().then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(e => {
            console.log(e);
        });
    }

    searchUsername = () => {
        this.setState({
            currentUser: null,
            currentIndex: -1
        });

        UserDataService.findByUsername(this.state.searchUsername).then(response => {
            this.setState({
                users: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchUsername, users, currentUser, currentIndex } = this.state;

        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                  <br />
                <TextField
                  name="search"
                  id="search"
                  label="Search by Username"
                  variant="outlined"
                  required
                  value={searchUsername}
                  onChange={this.onChangeSearchUsername}
                />
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.searchUsername}
                    style={{ marginTop: "3px", marginLeft: "7px", height: "50px", borderRadius: "5px" }}
                >
                  <SearchIcon />
                  &nbsp; Search
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.searchUsername}
                    style={{ marginTop: "3px", marginLeft: "75px", width: "100px", height: "50px", borderRadius: "5px" }}
                >
                  <AddCircleIcon />
                  &nbsp; Add
                </Button>  
     
              </div>
            </div>
            <div className="col-md-6">
              <h4>User List</h4>
    
              <ul className="list-group">
                {users &&
                  users.map((user: IUserData, index: number) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveUsers(user, index)}
                      key={index}
                    >
                      {user.username}
                    </li>
                  ))}
              </ul>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={this.removeAllUsers}
              >
                <RemoveCircleIcon /> 
                &nbsp; Remove All
              </Button> 
            </div>
            <div className="col-md-6">
              {currentUser ? (
                <div>
                  <h4>User</h4>
                  <div>
                    <label>
                      <strong>First Name:</strong>
                    </label>
                    {currentUser.firstName}
                  </div>
                  <div>
                    <label>
                      <strong>Last Name:</strong>
                    </label>
                    {currentUser.lastName}
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                    </label>{" "}
                    {currentUser.email}
                  </div>
                  <div>
                    <label>
                      <strong>Username:</strong>
                    </label>
                    {currentUser.username}
                  </div>
    
                  <Link
                    to={"/users/" + currentUser.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a User...</p>
                </div>
              )}
            </div>
          </div>
          
        );
    } 
}