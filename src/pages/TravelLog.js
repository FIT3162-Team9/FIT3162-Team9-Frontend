import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
      marginBottom: '-50px',
    },
    autoHeight: {
      height: '100px',
      width: 'auto',
  
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
  }))

function TravelLog(props) {
    const classes = useStyles()
    const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
    return (
        
            
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={autoHeightPaper}>
                    <Typography>
                        Hello
                    </Typography>
                </Paper>
            </Grid>
           
     
  );
}



export default TravelLog;