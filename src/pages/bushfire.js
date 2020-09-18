import React, { Component, useState, useEffect, useCallback} from 'react'
import BushfireChart from '../material-ui/BushfireChart'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomizedSlider from './../material-ui/Slider'
import { valHooks } from 'jquery'
import { temperature as data } from './../material-ui/data/data-visualisation';
import Analysis from './../components/Analysis';
import { getTemperature } from './../components/firebase';
import moment from 'moment';

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
      width: '918px',
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
    const [constExtreme, setExtreme, getExtreme] = useState(null);
    const [constCatastrophic, setCatastrophic] = useState(null);
    const [maxTemperature, setMaxTemperature] = useState(0);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    const [stationId, setStationId] = React.useState('76031');
    const [maxTemp, setMaxTemp] = useState([]);

    const validStationIds = ['76031', '76047', '76064']

    //Fetch temperature data from firestore
    
    //Function to fetch temperature data from firestore
    function refreshTemp() {
      console.log('works');
      let formattedDateRange = dateRange.map(date => moment(date).unix());
      console.log('dateRange', formattedDateRange);
      const startTimestamp = formattedDateRange[0];
      const endTimestamp = formattedDateRange[1]
      setTempData(data);
      let max = 0;
      data.forEach((doc) => doc.max > max ? max = doc.max : max = max );
      setMaxTemperature(max);
      //getTemperature(stationId, setTempData, startTimestamp, endTimestamp).then((response)=>updateChart());
      
      
    }
   
      
    const handleStationIdChange = (event) => {
      setStationId(event.target.value);
    };

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
          tempData.forEach((doc) => empty.push({max:doc['max'],timestamp:doc['timestamp'],bushfirerating:FFDI(doc['max']),low:11,high:12,veryhigh:24,severe:24,extreme:constExtreme,catastrophic:constCatastrophic}));
          //tempData.forEach((doc)=> console.log('{max:' + String(doc['max']) + ', min:' + String(doc['min']) + ', year:"' + String(doc['year']) +  '", timestamp:' + String(doc['timestamp'])+ ', month:' + String(doc['month']) + ', day:' + String(doc['day']) + '},'));
          //empty.forEach((doc)=> doc.bushfirerating > 99 ? doc.catastrophic = 50 : (doc.bushfirerating > 74 ? doc.extreme = 24 : null));
          
          let max = FFDI(maxTemperature);
          
       
          setMaxTemp(empty);
          if (max > 99) {
            setCatastrophic( max - 100);
            setExtreme(24);
            
          }
          else{
            setCatastrophic(0)
            max > 74 ? setExtreme(max - 75) : setExtreme(0);
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
                <Analysis method={{handleStationIdChange:handleStationIdChange, 
                  setDateRange:setDateRange, 
                  refreshTemp:refreshTemp,
                  validStationIds:validStationIds,
                  stationId:stationId,
                  dateRange:dateRange,
                  tempData:maxTemp}}/>
                {/* <BushfireChart weather ={stateWeather} /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.sliderHeight}>
              <CustomizedSlider method={{setHumidity: handleHumidity, setWind:handleWind, setDrought:handleDrought}}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.filterHeight}>
              
            </Paper>
          </Grid>
        </Grid>
      </Container>  
    )
    
}

export default Bushfire