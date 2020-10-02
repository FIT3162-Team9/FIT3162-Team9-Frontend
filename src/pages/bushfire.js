import React, { Component, useState, useEffect, useCallback} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomizedSlider from '../components/Slider'
import { temperature as data } from '../components/data/tempdata';
import Analysis from '../components/Analysis';
import BushfireFilter from '../components/BushfireFilter'
import moment from 'moment';
import {getTemperature,getForecastedTemperature,getHumidityWind} from './../components/firebase'
import Popup from './../components/Popup';

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

    const stationId = props.station.station;

    const [state, setState] = React.useState({
      temperature: true,
      bushfireratings: true,
      bushfirezone: false,
    });

    
    //Popup Notification
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    //White listed LGAs

    const validLGA = ['mildura_shire','wellington','horsham','greater_bendigo','glenelg','banyule','ballarat_north','brimbank',undefined]

    useEffect(() => {
      console.log('BUSHFIRE PROPS ---- ', props.station.station);
    }, [humidityWindData])

    //Add humidity & wind to datasets

    function addHumidityWind(){

    }
    
    //Function to fetch temperature data from firestore
    function refreshTemp() {
      
      if (!validLGA.includes(props.station.LGA)){
        handleClickOpen()
        return
      }

      let formattedDateRange = dateRange.map(date => moment(date).unix());
      console.log('dateRange', formattedDateRange);
      const startTimestamp = formattedDateRange[0];
      const endTimestamp = formattedDateRange[1]
      console.log(endTimestamp);
      setTempData(data);
      let max = 0;
      data.forEach((doc) => doc.max > max ? max = doc.max : max = max );
      setMaxTemperature(max);
      getHumidityWind(props.station.LGA, setHumidityWind,startTimestamp,endTimestamp)
      getForecastedTemperature(stationId, setTempData, startTimestamp, endTimestamp)
      getTemperature(stationId, setPastTempData, startTimestamp, endTimestamp).then((response)=>updateChart());
      
      

    }
      
    const FFDI = (temp) =>{
      let constant = -0.45;
      let drought = 0.987 * Math.log(parseInt(stateWeather[2]));
      let humidity = 0.0345 * (parseInt(stateWeather[0]));
      let temperature = 0.0338 * (temp);
      let windspeed = 0.0234 * (parseInt(stateWeather[1]));
      let exponential = (constant + drought - humidity + temperature + windspeed)
      let ratings = 2 * Math.exp(exponential)
    
      return ratings
    }

    const updateChart = () => {
        let empty = [];

          var dict = new Map();
          humidityWindData.forEach((doc) => dict.set(doc['timestamp'],{humidity:doc['humidity'],windspeed:doc['windspeed']}));
          pastTempData.forEach((doc) => empty.push({humidity:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['humidity'] : null   ,windspeed:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['windspeed'] : null,max:doc['max'],timestamp:doc['timestamp'],bushfirerating:FFDI(doc['max']),low:constLevel[0],high:constLevel[1],veryhigh:constLevel[2],severe:constLevel[3],extreme:constLevel[4],catastrophic:constLevel[5]}));
          tempData.forEach((doc) => empty.push({humidity:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['humidity'] : null       ,windspeed:dict.get(doc['timestamp']) ? dict.get(doc['timestamp'])['windspeed'] : null,max:doc['max'],timestamp:doc['timestamp'],bushfirerating:FFDI(doc['max']),low:constLevel[0],high:constLevel[1],veryhigh:constLevel[2],severe:constLevel[3],extreme:constLevel[4],catastrophic:constLevel[5]}));
          
        
          let max = FFDI(maxTemperature);
          setMaxTemp(empty);

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
      refreshTemp();
  }, [])

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
                  stationId:stationId,
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

          </Grid>
          <Grid item xs={12} md={4} lg={3} className={classes.filterHeight}>
            
                <Popup props={{open:open, handleClickOpen:handleClickOpen, handleClose:handleClose}}/>
                
          </Grid>
        </Grid>
      </Container>  
    )
    
}

export default Bushfire