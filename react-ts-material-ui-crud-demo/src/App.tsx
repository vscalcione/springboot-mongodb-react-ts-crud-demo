import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Button from "@material-ui/core/Button";


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import TutorialComponent from './components/TutorialComponent';
import AddTutorialComponent from './components/AddTutorialComponent';
import TutorialListComponent from './components/TutorialListComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

export default function App () {

  const classes = useStyles();
  //render() {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Button
              variant="contained"
              color="default"
              style={{ borderRadius: "10px" }}
            >
              <Link to={"/tutorials"} className="">
                vscalcione
              </Link>
            </Button>

            <Button
              variant="contained"
              color="default"
              style={{ marginLeft: "15px", borderRadius: "10px" }}
            >
              <Link to={"/tutorials"} className="">
                Tutorials
              </Link>
            </Button>

            <Button
              variant="contained"
              color="default"
              style={{ marginLeft: "15px", borderRadius: "10px" }}
            >
              <Link to={"/add"} className="">
                Add
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialListComponent} />
          <Route exact path="/add" component={AddTutorialComponent} />
          <Route path="/tutorials/:id" component={TutorialComponent} />
        </Switch>
    </div>
    );
  //}
};
