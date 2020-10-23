import React, { Component, useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import 'react-datepicker/dist/react-datepicker.css'

import Legend from '../components/Legend';

const useStyles = makeStyles(theme => ({
    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(4),
    },
  }))

function About() {

  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Legend/>
        </Grid>
      </Grid>
    </Container>
        )
}

export default About
