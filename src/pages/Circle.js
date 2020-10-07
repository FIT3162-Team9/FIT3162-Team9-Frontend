import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

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
  return (
    <Box margin="10px 5px 30px 20px" position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
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
        <Typography className={classes.circle} variant="caption" component="div">{`${props.value.props}`}</Typography>
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
        ><Typography className={classes.date}>16/3</Typography></Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Circle(props) {
  let color = ""
    
  if (props.props >= 100){
    color = '#c80815';
  }
  else if (props.props >= 75){
    color = '#ff4040';
  }
  else if (props.props >= 50){
    color = '#ffa500';
}
  else if (props.props >= 25){
    color = '#fcf75e';
}
  else if (props.props >= 12){
    color = '#87ceeb';
}
  else {
    color = '#addfad';
}
  return <CircularProgressWithLabel value={props} style={{'color': color}} />;
}
