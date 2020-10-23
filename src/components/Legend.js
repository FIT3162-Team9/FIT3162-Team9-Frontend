import React, { Component, useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import DatePicker from 'react-datepicker';
import Container from '@material-ui/core/Container';
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
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
  }))

function About() {

  const classes = useStyles()
  const autoHeightPaper = clsx(classes.paper, classes.autoHeight)

  return (
          <Paper style={{marginTop: 70}} className={autoHeightPaper}>
            <div style={{padding: 10}}>
              The fire danger ratings can be interpretted using the following table (<a href={'https://en.wikipedia.org/wiki/McArthur_Forest_Fire_Danger_Index'}>Source</a>)
            </div>
            <div style={{padding: 10}} >
                <table style={{padding: 10, border: '2px solid black'}}>
                    <tbody>
                        <tr>
                            <th>Category
                            </th>
                            <th>Forest Fire Danger Index
                            </th></tr>
                        <tr>
                        <td style={{background: '#C80815'}}><b><span style={{color: '#FFFFFF'}}>Catastrophic (Code Red)</span></b>
                        </td>
                        <td>100 +
                        </td>
                        </tr>
                    <tr>
                        <td style={{background: '#FF4040'}}><b>Extreme</b>
                        </td>
                        <td>75–99
                        </td>
                        </tr>
                    <tr>
                        <td style={{background: 'orange'}}><b>Severe</b>
                        </td>
                        <td>50–74
                        </td>
                        </tr>
                    <tr>
                        <td style={{background: '#FCF75E'}}><b>Very High</b>
                        </td>
                        <td>25–49
                        </td>
                        </tr>
                    <tr>
                        <td style={{background: 'skyblue'}}><b>High</b>
                        </td>
                        <td>12–24
                        </td>
                        </tr>
                    <tr>
                        <td style={{background: '#ADDFAD'}}><b>Low–Moderate</b>
                        </td>
                        <td>0–11
                        </td>
                        </tr></tbody>
                </table>
            
            </div>
          </Paper>

        )
}

export default About
