import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { WiWindy } from "react-icons/wi";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200 + theme.spacing(3) * 2,
    padding: "20px",
  },
  margin: {
    height: theme.spacing(2),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const WindSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const HumiditySlider = withStyles({
  root: {
    color: "#7EC0EE",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const DroughtSlider = withStyles({
  root: {
    color: "#f7500c",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ fontSize: "10px" }}>
        <h1>Climate</h1>
        <div className={classes.margin} />
        <Typography gutterBottom>Drought factor</Typography>
        <DroughtSlider
          onChange={props.method.setDrought}
          min={0}
          max={10}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={2}
        />
        <div className={classes.margin} />
      </div>
      {/* <Typography  gutterBottom>Relative humidity (Disabled)</Typography>
        <HumiditySlider disabled='true' onChange={props.method.setHumidity} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />
      <div className={classes.margin} />
        <Typography  gutterBottom>Wind speed (Disabled)</Typography>
        <WindSlider disabled='true'onChange={props.method.setWind} min={0} max={75} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} /> */}
    </div>
  );
}
