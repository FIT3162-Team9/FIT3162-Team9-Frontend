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

/**
 * Component which allow users to display and hide data series on the Bushfire Risk Analysis chart
 * @param {object} props.method.state                 props object with key value {temperature},{humidity},{windspeed},{bushfireratings},{bushfirezone}
 * @param {bool} props.method.state.temperature       boolean which represents whether temperature is active on chart
 * @param {bool} props.method.state.humidity          boolean which represents whether humidity is active on chart
 * @param {bool} props.method.state.windspeed         boolean which represents whether windspeed is active on chart
 * @param {bool} props.method.state.bushfireratings   boolean which represents whether bushfire ratings is active on chart
 * @param {array} props.method.state.bushfirezone     boolean which represents whether multi-colored background is active on chart
 */
export default function ChartFilter(props) {
  const classes = useStyles();

  /**
   * Enable and Disable data series on Bushfire Risk Analysis chart
   * function accepts event where event is the button clicked by user
   * then convert the boolean associated with the event to oposite of its current value
   */
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
      {/* Form Control for Temperature Data Series */}
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
        {/* Form Control for Humidity Data Series */}
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
        {/* Form Control for Windspeed Data Series */}
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
        {/* Form Control for Bushfire Rating Data Series */}
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
