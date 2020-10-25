import React, { Component, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clsx from "clsx";

import Home from "../pages/Dashboard";
import Bushfire from "../pages/BushfireAnalysis";
import Temperature from "../pages/TemperatureAnalysis";
import About from "./About";
import Items from "./../components/NavBar/NavbarItem";
import { getStates, getLGAs, getStations } from "../helpers/LocationApi";
import "./../App.css";
import "./../fonts/Quicksand-Regular.ttf";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { snakeToTitle } from "../helpers/utils";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Quicksand",
    display: "flex",
  },
  toolbar: {
    background: "transparent",
    paddingRight: 24, // keep right padding when drawer closed
    boxshadow: "none",
  },
  appBar: {
    zIndex: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "transparent",
    boxshadow: "none",
    height: "80px",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    overflowX: "hidden",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    color: "black", //'#255C59',
    fontFamily: "Quicksand",
    flexGrow: 1,
    fontSize: "44px",
    textAlign: "left",
    paddingTop: "20px",
    paddingLeft: "10px",
  },
  drawerPaper: {
    background:
      "linear-gradient(  rgb(32,150,160) ,rgba(7,71,67,.5), rgba(7,71,67,.5), rgb(64,201,191,.2))",
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    fontFamily: "Quicksand",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appName: {
    fontFamily: "Quicksand",
    fontSize: "28px",
    color: "white",
    textAlign: "center",
    paddingTop: "16px",
  },
  mainItems: {
    padding: "60px 8px",
    textAlign: "center",
    color: "white",
  },
  dashboardTitle: {
    color: "black",
    fontFamily: "Quicksand",
    paddingRight: "1450px",
    paddingLeft: "480px",
    paddingTop: "-200px",
    flexGrow: 1,
    fontSize: "40px",
  },
}));

export const Routes = (props) => {
  const { station, LGA } = props;
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home station={station} LGA={LGA} />}
        />
        <Route
          exact
          path="/bushfire"
          render={() => <Bushfire station={station} LGA={LGA} />}
        />
        <Route
          exact
          path="/temperature"
          render={() => <Temperature station={station} />}
        />
        <Route exact path="/about" component={About} />
      </Switch>
    </>
  );
};

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [states, setStates] = React.useState([]);
  const [LGAs, setLGAs] = React.useState([]);
  const [state, setState] = React.useState();
  const [LGA, setLGA] = React.useState();
  const [stations, setStations] = React.useState();
  const [station, setStation] = React.useState("76031");

  React.useEffect(() => {
    const states = getStates();
    console.log("states", setStates(states));
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          elevation={0}
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <Switch>
                <Route exact path="/">
                  Dashboard
                </Route>
                <Route exact path="/temperature">
                  Temperature
                </Route>
                <Route exact path="/bushfire">
                  Bushfire Risk
                </Route>
                <Route exact path="/about">
                  About
                </Route>
              </Switch>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <Typography
            component="h1"
            variant="h5"
            color="white"
            className={classes.appName}
          >
            S P △ R K
          </Typography>
          <Typography
            style={{ marginTop: 20, color: "white" }}
            component="h2"
            color="white"
            variant="h6"
          >
            Station ID: {station}
          </Typography>
          <div style={{ marginTop: 10 }}>
            {states !== [] && (
              <FormControl>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state-select"
                  value={states[0]}
                  onChange={(val) => {
                    console.log(val.target.value);
                    setState(val.target.value);
                    getLGAs(val.target.value, setLGAs);
                  }}
                  style={{ width: 160 }}
                >
                  {states.map((val, index) => (
                    <MenuItem key={index} value={val}>
                      {val.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            {LGAs !== [] && state && (
              <FormControl>
                <InputLabel id="lga-label">LGAs</InputLabel>
                <Select
                  labelId="lga-label"
                  id="lga-select"
                  value={LGAs[0]}
                  onChange={(val) => {
                    console.log(val.target.value);
                    setLGA(val.target.value);
                    getStations(state, val.target.value, (stationVal) => {
                      setStation(stationVal[0]);
                      setStations(stationVal);
                    });
                  }}
                  style={{ width: 160 }}
                >
                  {LGAs.map((val, index) => (
                    <MenuItem key={index} value={val}>
                      {snakeToTitle(val)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            {LGAs !== [] && state && station && stations && (
              <FormControl>
                <InputLabel id="stations-label">Stations</InputLabel>
                <Select
                  labelId="stations-label"
                  id="stations-select"
                  value={station}
                  onChange={(val) => {
                    console.log(val.target.value);
                    setStation(val.target.value);
                  }}
                  style={{ width: 160 }}
                >
                  {stations.map((val, index) => (
                    <MenuItem key={index} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <List className={classes.mainItems}>
            <Items />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.appBarSpacer} />
          <Routes station={station} LGA={LGA} />
        </main>
      </div>
    </Router>
  );
}
