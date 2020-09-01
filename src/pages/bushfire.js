import React, { Component, useState } from 'react'
import BushfireChart from '../material-ui/BushfireChart'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomizedSlider from './../material-ui/Slider'

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
    },
    autoHeight: {
      height: 'auto',
      width: 'auto',
  
    },

    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }))

function Bushfire(props) {
        const classes = useStyles()
        const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
        return (
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={autoHeightPaper}>
                    <BushfireChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={autoHeightPaper}>
                  <CustomizedSlider />
                </Paper>
              </Grid>
            </Grid>
          </Container>
                
            
        )
    
}

export default Bushfire