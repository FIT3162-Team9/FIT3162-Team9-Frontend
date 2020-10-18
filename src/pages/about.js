import React, { Component, useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import DatePicker from 'react-datepicker';
import Container from '@material-ui/core/Container';
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
    },
    autoHeight: {
      height: '280px',
      width: '400px',
      alignItems: 'center'
    },

    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(4),
    },
  }))

function About() {

  const classes = useStyles()
  const autoHeightPaper = clsx(classes.paper, classes.autoHeight)

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={autoHeightPaper}>
            <div style={{padding: 10}} >
                <table style={{padding: 10, border: '2px solid black'}}>
                    <caption> The fire danger ratings can be interpretted using the following table (<a href={'https://en.wikipedia.org/wiki/McArthur_Forest_Fire_Danger_Index'}>Source</a>)
                    </caption>
                    <tbody>
                        <tr>
                            <th rowSpan={2}>Category
                            </th>
                            <th colSpan={2}>Fire Danger Index
                            </th></tr>
                        <tr>
                            <th>Forest
                            </th>
                            <th>Grassland
                            </th></tr>
                        <tr>
                        <td style={{background: '#C80815'}}><b><span style={{color: '#FFFFFF'}}>Catastrophic (Code Red)</span></b>
                        </td>
                        <td>100 +
                        </td>
                        <td>150 +
                        </td></tr>
                    <tr>
                        <td style={{background: '#FF4040'}}><b>Extreme</b>
                        </td>
                        <td>75–99
                        </td>
                        <td>100–149
                        </td></tr>
                    <tr>
                        <td style={{background: 'orange'}}><b>Severe</b>
                        </td>
                        <td>50–74
                        </td>
                        <td>50–99
                        </td></tr>
                    <tr>
                        <td style={{background: '#FCF75E'}}><b>Very High</b>
                        </td>
                        <td>25–49
                        </td>
                        <td>25–49
                        </td></tr>
                    <tr>
                        <td style={{background: 'skyblue'}}><b>High</b>
                        </td>
                        <td>12–24
                        </td>
                        <td>12–24
                        </td></tr>
                    <tr>
                        <td style={{background: '#ADDFAD'}}><b>Low–Moderate</b>
                        </td>
                        <td>0–11
                        </td>
                        <td>0–11
                        </td></tr></tbody>
                </table>
            
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
        )
}

export default About
