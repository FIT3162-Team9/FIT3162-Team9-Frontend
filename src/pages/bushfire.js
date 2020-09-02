import React, { Component, useState } from 'react'
import BushfireChart from '../material-ui/BushfireChart'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomizedSlider from './../material-ui/Slider'
import { valHooks } from 'jquery'
import { bushfire as data } from './../material-ui/data/data-visualisation';

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
        const [stateWeather,setWeatherSlider] = useState(['20','20','2',data]);


        const FFDI = () =>{
          let constant = -0.45;
          let drought = 0.987 * Math.log(parseInt(stateWeather[2]));
          let humidity = 0.0345 * (parseInt(stateWeather[0]));
          let temperature = 0.0338 * (40);
          let windspeed = 0.0234 * (parseInt(stateWeather[1]));
          let exponential = (constant + drought - humidity + temperature + windspeed)
          let ratings = 2 * Math.exp(exponential)  
          console.log(ratings)
        }
        const updateChart = () => {
          FFDI();
          //setWeatherSlider([stateWeather[0],stateWeather[1],stateWeather[2],data]);
        }

        const handleHumidity= (e,val) => {
          setWeatherSlider([String(val),stateWeather[1],stateWeather[2],stateWeather[3]]);
          updateChart();
        }
        const handleWind= (e,val) => {
          setWeatherSlider([stateWeather[0],String(val),stateWeather[2],stateWeather[3]]);
          updateChart();
        }
        const handleDrought= (e,val) => {
          setWeatherSlider([stateWeather[0],stateWeather[1],String(val),stateWeather[3]]);
          updateChart();
        }

        const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
        return (
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={autoHeightPaper}>
                    <BushfireChart weather ={stateWeather} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={autoHeightPaper}>
                  <CustomizedSlider method={{setHumidity: handleHumidity, setWind:handleWind, setDrought:handleDrought}}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
                
            
        )
    
}

export default Bushfire