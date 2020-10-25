import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WhatshotSharpIcon from "@material-ui/icons/WhatshotSharp";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import HorizontalSplitRoundedIcon from "@material-ui/icons/HorizontalSplitRounded";
import OpacityIcon from "@material-ui/icons/Opacity";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Quicksand",
  },
  filter: {
    fontSize: "30px",
  },
}));

export default function ChartFilter(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.method.setState({
      ...props.method.state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",

        transform: "translate(-60%)",
      }}
    >
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              icon={<WbSunnyOutlinedIcon />}
              checkedIcon={<WbSunnyOutlinedIcon />}
              name="temperature"
              onChange={handleChange}
              style={{
                color: props.method.state.temperature ? "orange" : "grey",
              }}
            />
          }
          label="Temperature"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<OpacityIcon />}
              checkedIcon={<OpacityIcon />}
              name="humidity"
              onChange={handleChange}
              style={{
                color: props.method.state.humidity ? "blue" : "grey",
              }}
              className={classes.filter}
            />
          }
          label="Humidity"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<WhatshotSharpIcon />}
              checkedIcon={<WhatshotSharpIcon />}
              name="windspeed"
              onChange={handleChange}
              style={{
                color: props.method.state.windspeed ? "green" : "grey",
              }}
              className={classes.filter}
            />
          }
          label="Windspeed"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<WhatshotSharpIcon />}
              checkedIcon={<WhatshotSharpIcon />}
              name="bushfireratings"
              onChange={handleChange}
              style={{
                color: props.method.state.bushfireratings ? "red" : "grey",
              }}
            />
          }
          className={classes.filter}
          label="Bushfire Ratings"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<HorizontalSplitRoundedIcon />}
              checkedIcon={<HorizontalSplitRoundedIcon />}
              name="bushfirezone"
              onChange={handleChange}
              style={{
                color: props.method.state.bushfirezone ? "black" : "grey",
              }}
              className={classes.filter}
            />
          }
          label="Bushfire Zone"
        />
      </FormGroup>
    </div>
  );
}
