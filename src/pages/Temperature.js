import React, { Component } from 'react'
import Visualisation from "../components/Visualisation"
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import DatePicker from "../components/DatePicker";

const useStyles = makeStyles(theme => ({
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
    },
    autoHeight: {
      height: 'auto',
    },
  }))

function Temperature(props) {
  const classes = useStyles()
  const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
        return (
            <div>
                <Grid item xs={12} >
                  <Paper className={autoHeightPaper}>
                    <Visualisation />
                    <DatePicker date="Start Date"/>
                    <DatePicker date="End Date" />
                  </Paper>   
                </Grid>
            </div>
        )
}

export default Temperature
