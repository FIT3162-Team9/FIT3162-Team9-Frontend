import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Quicksand",
  },
  circle: {
    fontSize: "18px",
  },
  date: {
    fontSize: "15px",
  },
}));

export const bushfireColor = (bushfireRating) => {
  if (bushfireRating >= 100) {
    return "#c80815";
  } else if (bushfireRating >= 75) {
    return "#ff4040";
  } else if (bushfireRating >= 50) {
    return "#ffa500";
  } else if (bushfireRating >= 25) {
    return "#fcf75e";
  } else if (bushfireRating >= 12) {
    return "#87ceeb";
  } else {
    return "#addfad";
  }
};

function CircularProgressWithLabel(props) {
  const classes = useStyles();
  const { bushfireRating, day, month } = props;
  const circular = { value: 100, style: props.style };
  return (
    <Box margin="10px 5px 30px 20px" position="relative" display="inline-flex">
      <CircularProgress variant="static" {...circular} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          className={classes.circle}
          variant="caption"
          component="div"
        >{`${Math.floor(bushfireRating * 10) / 10}`}</Typography>
      </Box>
      <Box
        top={50}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography className={classes.date}>{`${day}/${month}`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The bushfireRating, day, and month should be numbers displayed on the Circle.
   * bushfireRating value above 0
   */
  bushfireRating: PropTypes.number.isRequired,
  /**
   * Day of the forecasted bushfire rating
   * Day between 1 and 31 depending on months
   */
  day: PropTypes.number.isRequired,
  /**
   * Month of the forecasted bushfire rating
   * Month between 1 and 12
   */
  month: PropTypes.number.isRequired,
};

export default function BushfireCircle(props) {
  const color = bushfireColor(props.bushfireRating);
  return (
    <CircularProgressWithLabel
      bushfireRating={props.bushfireRating}
      day={props.day}
      month={props.month}
      style={{ color: color }}
    />
  );
}

BushfireCircle.propTypes = {
  /**
   *The danger level of the bushfire are determined by the bushfireRating
   *and different colors will be displayed on the BushfireCircle based on the danger level
   *bushfireRating value above 0
   */
  bushfireRating: PropTypes.number.isRequired,
};
