import React, { Component, useState, useEffect, useCallback} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomizedSlider from './Slider'
import { temperature as data } from '../../mocks/tempdata';
import Analysis from './Analysis';
import BushfireFilter from './BushfireFilter'
import moment from 'moment';
import { getTemperature, getForecastedTemperature } from '../../helpers/TemperatureApi';
import { getHumidityWind } from '../../helpers/HumidityWindApi';
import Popup from '../../components/Popup';
import Legend from '../../components/Legend';
import PropTypes from 'prop-types';
import {FFDI} from './FFDI';

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
      height: '370px',
      width: 'auto',
  
    },
    sliderHeight:{
      height: '180px',
      width: '250px',
    },
    filterHeight:{
      marginTop: '-20px',
      height: '50px',
      width: 'auto',

    },
    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(4),
    },
  }))

const MILDURA_SHIRE = 'mildura_shire';
const WELLINGTON = 'wellington';
const HORSHAM = 'horsham';
const GREATER_BENDIGO = 'greater_bendigo';
const GLENELG = 'glenelg';
const BANYULE = 'banyule';
const BALLARAT_NORTH = 'ballarat_north';
const BRIMBANK = 'brimbank';

/**
 * Bushfire component page to be displayed when selected on navigation bar.
 * Computes Bushfire Ratings using FFDI Model and climate data called from firebase.
 * Allows user to do analyze climate trends by displaying these data on a Chart
 * @param {object} props                props object with key value {station,LGA}
 * @param {string} props.station  Station ID selected by user
 * @param {string} props.LGA     Local Government Area selected by user
 */

function Bushfire(props) {
    const classes = useStyles()
    const [stateWeather,setWeatherSlider] = useState(['20','20','2',data]);
    const [tempData, setTempData] = useState([]);
    const [pastTempData, setPastTempData] = useState([]);
    const [humidityWindData, setHumidityWind] = useState([]);
    const [constLevel, setLevel] = useState([11,12,24,24,null,null])
    const [maxTemperature, setMaxTemperature] = useState(0);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
  
    const [maxTemp, setMaxTemp] = useState([]);

    // const stationId = props.station.station;

    const [state, setState] = React.useState({
      temperature: true,
      bushfireratings: true,
      humidity: false,
      windspeed: false,
      bushfirezone: true,
    });

    /**
     * Popup Notification
     */

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    /**
     * White listed LGAs
     */

    const validLGA = [MILDURA_SHIRE, WELLINGTON, HORSHAM, GREATER_BENDIGO, GLENELG, BANYULE, BALLARAT_NORTH, BRIMBANK, undefined]

    useEffect(() => {
      console.log('BUSHFIRE PROPS ---- ', props.station);
    }, [humidityWindData])

    /**
     *Function to fetch temperature data from firestore
     */
    function refreshTemp() {
      console.log(dateRange)
      let formattedDateRange = dateRange.map(date => moment(date).unix());
      console.log('dateRange', formattedDateRange);
      const startTimestamp = formattedDateRange[0];
      const endTimestamp = formattedDateRange[1]
      console.log('startTimestamp', startTimestamp)

      if (!validLGA.includes(props.LGA)){
        handleClickOpen()
        return
      } else {
        let minYear = 2009;
        if (props.LGA === HORSHAM){
          minYear = 2013;
        }
        const checkStartTimestamp = moment({ year: minYear, month: 1, day: 1}).unix();
        if (checkStartTimestamp > startTimestamp){
          handleClickOpen();
          return
        }
      }

      console.log(endTimestamp);
      // setTempData(data);
      let max = 0;
      data.forEach((doc) => doc.max > max ? max = doc.max : max = max );
      setMaxTemperature(max)
      getHumidityWind(props.LGA, (db_hw) => {setHumidityWind(db_hw); console.log('db_hw fetched', db_hw);}, startTimestamp, endTimestamp)
      getForecastedTemperature(props.station, (db_temp) => {setTempData(db_temp); console.log('db_temp fetched', db_temp)}, startTimestamp, endTimestamp)
      getTemperature(props.station, (db_past) => {setPastTempData(db_past); console.log('db_past fetched', db_past)}, startTimestamp, endTimestamp);
    }


    /**
     * Calculates bushfire ratings using climate data (temperature,humidity,windspeed) from a range of selected date
     */  
    function updateChart() {
        let climateData = [];
          console.log('data', humidityWindData, pastTempData, tempData);

          var dict = new Map();
          humidityWindData.forEach((doc) => dict.set(doc['timestamp'],{humidity:doc['humidity'],windspeed:doc['windspeed']}));

          pastTempData.forEach((doc) => climateData.push({humidity:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['humidity'] : null ,
                                                          windspeed:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['windspeed'] : null,
                                                          max:doc['max'],date:`${doc['day']}-${doc['month']}-${doc['year']}`, bushfirerating:FFDI(doc['max'],dict.get(doc['timestamp']),stateWeather[2]),
                                                          low:constLevel[0],high:constLevel[1],veryhigh:constLevel[2],severe:constLevel[3],extreme:constLevel[4],catastrophic:constLevel[5]}));
          
          tempData.forEach((doc) => climateData.push({humidity:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['humidity'] : null,
                                                      windspeed:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['windspeed'] : null,
                                                      max:doc['max'],date:`${doc['day']}-${doc['month']}-${doc['year']}`,bushfirerating:FFDI(doc['max'],dict.get(doc['timestamp']),stateWeather[2]),
                                                      low:constLevel[0],high:constLevel[1],veryhigh:constLevel[2],severe:constLevel[3],extreme:constLevel[4],catastrophic:constLevel[5]}));
          
          let max = FFDI(maxTemperature);
          setMaxTemp(climateData);
          console.log('climateData', climateData);

          if (max > 99) {         
            let level = [...constLevel]
            level[5] = max - 100;
            level[4] = 24;
            setLevel(level)
          }
          else{
            let level = [...constLevel]
            level[5] = 0;
            max > 74 ? level[4] = (max - 75) : level[4] = 0;
            setLevel(level);
          }
         
    }

    useEffect(() => {
        console.log('--------- refresh temp and chart');
        refreshTemp();
        // setTimeout(updateChart, 2000);
    }, [props.station])

    useEffect(() => {
      console.log('state_data', humidityWindData, pastTempData, tempData);
      setTimeout(updateChart, 1000);
  }, [pastTempData])


    //HANDLE SLIDERS
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
                <Analysis method={{
                  setDateRange:setDateRange, 
                  refreshTemp:refreshTemp,
                  stationId:props.station,
                  dateRange:dateRange,
                  tempData:maxTemp,
                  state:state}}/>
                {/* <BushfireChart weather ={stateWeather} /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.sliderHeight}>
              <CustomizedSlider method={{setHumidity: handleHumidity, setWind:handleWind, setDrought:handleDrought}}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3} className={classes.filterHeight}>
              <BushfireFilter method={{state:state, setState:setState, constLevel: constLevel}}/>
              <Legend/>
          </Grid>
          <Grid item xs={12} md={4} lg={3} className={classes.filterHeight}>
              <Popup props={{open:open, handleClickOpen:handleClickOpen, handleClose:handleClose}}/>
          </Grid>
        </Grid>
      </Container>  
    )
    
}

Bushfire.propTypes = {
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

export default Bushfire