import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  root: {
      fontFamily: 'Quicksand',
  },
  circle: {
    fontSize: '18px',
  },
  date: {
    fontSize: '15px',
  }
  
}))


function CircularProgressWithLabel(props) {
  const classes = useStyles()
  const {bushfirerating,day,month} = props;
  const circular = {value: 100, style: props.style};
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
        <Typography className={classes.circle} variant="caption" component="div">{`${Math.floor(bushfirerating * 10) / 10}`}</Typography>
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
        ><Typography className={classes.date}>{`${day}/${month}`}</Typography></Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The bushfirerating, day, and month should be numbers displayed on the Circle.
   * Bushfirerating value above 0
   * Day between 1 and 31 depending on months
   * Month between 1 and 12
   */
  bushfirerating: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default function Circle(props) {
  let color = ""
    
  if (props.bushfirerating >= 100){
    color = '#c80815';
  }
  else if (props.bushfirerating >= 75){
    color = '#ff4040';
  }
  else if (props.bushfirerating >= 50){
    color = '#ffa500';
}
  else if (props.bushfirerating >= 25){
    color = '#fcf75e';
}
  else if (props.bushfirerating >= 12){
    color = '#87ceeb';
}
  else {
    color = '#addfad';
}
  return <CircularProgressWithLabel bushfirerating={props.bushfirerating} day={props.day} month={props.month} style={{'color': color}} />;
}

Circle.propTypes = {
  /**
   *The danger level of the bushfire are determined by the bushfirerating
   *and different colors will be displayed on the Circle based on the danger level
   *Bushfirerating value above 0
   */
  bushfirerating: PropTypes.number.isRequired,
};