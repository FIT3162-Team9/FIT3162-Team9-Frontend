import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Circle from './Circle'
import moment from 'moment'
import Divider from '@material-ui/core/Divider'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import { getTemperature, getForecastedTemperature } from '../../helpers/TemperatureApi';
import { getHumidityWind } from '../../helpers/HumidityWindApi';
import { snakeToTitle } from '../../helpers/utils'

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {      
      overflow: 'auto',
      flexGrow: 1,
      height: 'auto',
      width: 'auto',
      padding: '15px',
      paddingTop: '5px',
      margin: '15px',
    },
    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(4),
    },
    title: {
      color: 'black',//'#255C59',
      fontFamily: 'Quicksand',
      paddingRight: '1450px',
      paddingLeft: '480px',
      paddingTop: '-200px',
      flexGrow: 1,
      fontSize: '40px',
      
    },
    typography: {
      marginLeft: '20px',
      marginTop: '20px',
      fontSize: '20px',
      display: 'flex',
    },
    circle: {
      fontSize: '50px',
    },
    paperColor: {
      background: "white" ,
    },
    outerPaper: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      padding: '20px',
      width: '80%',
      background: "transparent",
      boxShadow: 'none',
    },
    headerFont:{
      fontSize: '20px',
      opacity: '1',
    },
    dateFont:{
      fontSize: '15px',
      opacity: '1',
    },
    addButton:{
      background: '#316e80',
      fontSize: '12px',
      margin: '20px 20px 25px 20px',
      color: 'white',
      opacity: '100%',
    },
    clearButton: {
      fontSize: '12px',
      margin: '0px 0px 5px 0px',
      opacity: '100%',
    }
  }))

  /**
 * Home component page to be displayed when selected on navigation bar.
 * Computes Bushfire Ratings using FFDI Model and climate data called from firebase.
 * Display forecasted Bushfire Risk to assist users with their travel planning
 * @param {object} props                props object with key value {station,LGA}
 * @param {string} props.station  Station ID selected by user
 * @param {string} props.LGA     Local Government Area selected by user
 */

function Home(props) {
    const classes = useStyles()
    const autoHeightColoredPaper = clsx(classes.paper, classes.paperColor)
    const [userLog, setUserLog] = useState([]);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    const LGA = props ? props.LGA : undefined
    const station = props? props.station: undefined
    const [tempData , setTempData] = useState();
    const [pastTempData , setPastTempData] = useState();
    const [humidityWindData, setClimateData] = useState();
   
    /*FFDI Ratings Calculation*/

  
    const FFDI = (temp, climate) =>{
      let constant = -0.45;
      let drought = 0.987 * Math.log(10);
      let humidity = climate ? 0.0345 * climate['humidity'] : 0.0345 * (5);
      let temperature = 0.0338 * (temp);
      let windspeed = climate ? 0.0234 * climate['windspeed'] : 0.0234 * (80);
      let exponential = (constant + drought - humidity + temperature + windspeed)
      let ratings = 2 * Math.exp(exponential)
      console.log("ffdi",temp,climate['humidity'],climate['windspeed'])
      console.log(ratings)
      
      if (ratings<1){
        return 1
      }
      else if (ratings>150) {
        return 150
      }
      else{
        return ratings
      }
    }

    const callData = () => {
        if (!LGA || !station) {return}
        let formattedDateRange = dateRange.map(date => moment(date).unix());
        const startTimestamp = formattedDateRange[0];
        const endTimestamp = formattedDateRange[1]
        getForecastedTemperature(station,setTempData,startTimestamp,endTimestamp)
        getTemperature(station,setPastTempData,startTimestamp,endTimestamp)
        getHumidityWind(LGA,setClimateData,startTimestamp,endTimestamp)
    }

    /*FFDI Ratings Calculation*/
    const addLog = () => {
      if (!LGA) {return} 
      if (!tempData) { return }
      let empty = [];
      console.log('data', humidityWindData, pastTempData, tempData);

      var dict = new Map();
      humidityWindData.forEach((doc) => dict.set(doc['timestamp'],{humidity:doc['humidity'],windspeed:doc['windspeed']}));
      pastTempData.forEach((doc) => empty.push({day:doc['day'],month:doc['month'],humidity:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['humidity'] : null ,
                                                windspeed:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['windspeed'] : null,
                                                max:doc['max'],bushfirerating:FFDI(doc['max'],dict.get(doc['timestamp']))}));
      tempData.forEach((doc) => empty.push({day:doc['day'],month:doc['month'],humidity:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['humidity'] : null,
                                            windspeed:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['windspeed'] : null,
                                            max:doc['max'],bushfirerating:FFDI(doc['max'],dict.get(doc['timestamp']))}));
        
        let tempUserLog = [userLog];
        let circleList = [];
        empty.forEach((doc) => circleList.push(<Circle className={classes.circle} day = {doc['day']} month = {doc['month']} bushfirerating = {doc['bushfirerating']} props={doc} />))
        tempUserLog.push(<Grid item xs={12} md={8} lg={9}>
                          <Paper className={autoHeightColoredPaper}>
                            <Typography className={classes.typography}>
                              {LGA ? snakeToTitle(LGA) : "No LGA Selected"} 
                            </Typography>
                            {circleList}
                          </Paper>
                          <Divider/>
                        </Grid>
                          );
        setUserLog(tempUserLog);
       
    } 

    const clearPage = () => {
      setUserLog([])
    }

    useEffect(() => {
      addLog();
    }, [humidityWindData]);

    useEffect(() => {
    }, [userLog])

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Paper className={classes.outerPaper}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Typography className={classes.headerFont}>
                        Selected LGA: {LGA ? snakeToTitle(LGA) : "None"}
                    </Typography>
                    <Typography className={classes.headerFont}>
                        Selected Station: {station ? station : "None"}
                    </Typography>
                    <DateRangePicker className={classes.dateFont}
                      onChange={setDateRange}
                      value={dateRange}
                      />
                    <Button className={classes.addButton} onClick={()=>callData()}>
                        Add User Log
                    </Button>
                    <Button onClick={()=>clearPage()}>
                      Clear
                    </Button>
                    <Divider></Divider>
                </Grid>            
                {userLog}
              </Paper>
            </Grid>
        </Container>
    )
    }

Home.propTypes = {
  /**
   * LGA selected by user
   * To perform API call to firebase to fetch humidity/windspeed data
   */
  LGA: PropTypes.string.isRequired,
  /**
   * Station ID seleceted by user 
   * To perform API call to firebase to fetch temperature data
   */
  station: PropTypes.string.isRequired,
  
};

export default Home
