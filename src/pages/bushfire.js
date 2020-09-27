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
import {getTemperature,getForecastedTemperature} from './../components/firebase'

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
    const [constLevel, setLevel] = useState([11,12,24,24,null,null])
    const [maxTemperature, setMaxTemperature] = useState(0);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    // const [stationId, setStationId] = React.useState('76031');
    const [maxTemp, setMaxTemp] = useState([]);

    const stationId = props.station;

    const validStationIds = ['76031', '76047', '76064']

    const [filterState, setFilterState] = useState([true,true,true]);

    const [state, setState] = React.useState({
      temperature: true,
      bushfireratings: true,
      bushfirezone: true,
    });

    useEffect(() => {
      console.log('BUSHFIRE PROPS ---- ', props.station);
    }, [])

    //Fetch temperature data from firestore
    
    //Function to fetch temperature data from firestore
    function refreshTemp() {
      let formattedDateRange = dateRange.map(date => moment(date).unix());
      console.log('dateRange', formattedDateRange);
      const startTimestamp = formattedDateRange[0];
      const endTimestamp = formattedDateRange[1]
    
      setTempData(data);
      let max = 0;
      data.forEach((doc) => doc.max > max ? max = doc.max : max = max );
      setMaxTemperature(max);
      getForecastedTemperature(stationId, setTempData, startTimestamp, endTimestamp).then((response)=>updateChart());
      getTemperature(stationId, setPastTempData, startTimestamp, endTimestamp).then((response)=>updateChart());
      
    }
      
    // const handleStationIdChange = (event) => {
    //   setStationId(event.target.value);
    // };

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
          
          pastTempData.forEach((doc) => empty.push({max:doc['max'],timestamp:doc['timestamp'],bushfirerating:FFDI(doc['max']),low:constLevel[0],high:constLevel[1],veryhigh:constLevel[2],severe:constLevel[3],extreme:constLevel[4],catastrophic:constLevel[5]}));
          tempData.forEach((doc) => empty.push({max:doc['max'],timestamp:doc['timestamp'],bushfirerating:FFDI(doc['max']),low:constLevel[0],high:constLevel[1],veryhigh:constLevel[2],severe:constLevel[3],extreme:constLevel[4],catastrophic:constLevel[5]}));
          
          //tempData.forEach((doc)=> console.log('{max:' + String(doc['max']) + ', min:' + String(doc['min']) + ', year:"' + String(doc['year']) +  '", timestamp:' + String(doc['timestamp'])+ ', month:' + String(doc['month']) + ', day:' + String(doc['day']) + '},'));
          //empty.forEach((doc)=> doc.bushfirerating > 99 ? doc.catastrophic = 50 : (doc.bushfirerating > 74 ? doc.extreme = 24 : null));
          
          let max = FFDI(maxTemperature);
          
       
          setMaxTemp(empty);

          if (max > 99) {
            //setCatastrophic( max - 100);
            //setExtreme(24);
            let level = [...constLevel]
            level[5] = max - 100;
            level[4] = 24;
            setLevel(level)
            
          }
          else{
            let level = [...constLevel]
            level[5] = 0;
            //setLevel(level)
            //setCatastrophic(0)
            max > 74 ? level[4] = (max - 75) : level[4] = 0;
            setLevel(level);
          }

      //setWeatherSlider([stateWeather[0],stateWeather[1],stateWeather[2],data]);
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
        </Grid>
      </Container>  
    )
    
}

export default Bushfire