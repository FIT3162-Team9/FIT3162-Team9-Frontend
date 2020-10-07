import React, { Component, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Circle from './Circle'

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {
      
      overflow: 'auto',

      marginRight: '0px',
      marginBottom: '-50px',
    },
    autoHeight: {
      height: 'auto',
      width: '900px',
  
    },
    sliderHeight:{
      height: 'auto',
      width: '250px',
    },
    filterHeight:{
      marginTop: '-30px',
      height: '50px',
      width: 'auto',

    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    typography: {
      marginLeft: '20px',
      marginTop: '20px',
      fontSize: '50px',
      display: 'flex',
    },
    circle: {
      fontSize: '50px',
    }
  }))

function TravelLog(props) {
    const classes = useStyles()
    const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
    const [circles,setCircles] = useState([])
  
    const addCircles = () => {
      const bushfireRatings = [32,52,23,62,30,5,6,57,87,35,75,123,53,74,85,46,2,5]
      let circleList = [];
      bushfireRatings.forEach((doc) => circleList.push(<Circle className={classes.circle} props={doc} />))
      
      setCircles(circleList);
     
      
  }
    useEffect(() => {
      addCircles();
  }, [])
      

    return (
            
                <Paper className={autoHeightPaper}>
                    <Typography className={classes.typography}>
                      {props.LGA}
                      Hello
                    </Typography>
                    {circles}
                </Paper>
          
           
     
  );
}



export default TravelLog;