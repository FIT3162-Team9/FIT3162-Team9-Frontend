import React, { Component, useState, useEffect} from 'react'
import TemperatureVisualisation from "../components/Visualisation"
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import DatePicker from 'react-datepicker';
import Container from '@material-ui/core/Container';
import 'react-datepicker/dist/react-datepicker.css'

const useStyles = makeStyles(theme => ({
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
    },
    autoHeight: {
      height: '350px',
      width: 'auto',
  
    },

    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }))

function Temperature(props) {


  useEffect(() => {
    console.log('TEMPERATURE PROPS ---- ', props.station);
  }, [props])

  //Requires attention: Year of start date should be earlier than year of end date.  

  const classes = useStyles()

  const autoHeightPaper = clsx(classes.paper, classes.autoHeight)

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={autoHeightPaper}>
            <TemperatureVisualisation station={props.station}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
        )
}

export default Temperature
