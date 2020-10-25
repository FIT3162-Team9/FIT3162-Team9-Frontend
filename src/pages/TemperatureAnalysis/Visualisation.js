import React, {useState, useEffect} from "react";
import Chart from './TemperatureChart';
import { getTemperature, getForecastedTemperature } from '../../helpers/TemperatureApi';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import RefreshIcon from '@material-ui/icons/Refresh';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import moment from 'moment';

import Title from '../../components/Title';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { temperature as data } from '../../mocks/tempdata';

function TemperatureVisualisation(props){
    const [tempData, setTempData] = useState([]);
    const [forecastedData, setForecastedData] = useState([]);
    const [combinedData, setCombinedData] = useState([]); // Used to combine historic and forecasted data

    // Date range initialised with values from last month last year to the month before
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    
    // Refresh temp called when the station changes
    useEffect(() => {
        refreshTemp();
    }, [props.station])

    // Function called to refresh the data based on the attributes of station and timestamps
    function refreshTemp() {
        let formattedDateRange = dateRange.map(date => moment(date).unix());
        console.log('dateRange', formattedDateRange);
        const startTimestamp = formattedDateRange[0];
        const endTimestamp = formattedDateRange[1]
        getTemperature(props.station, setTempData, startTimestamp, endTimestamp);
        getForecastedTemperature(props.station, setForecastedData, startTimestamp, endTimestamp);
    }

    // When tempData and forecastedData are refreshed 
    useEffect(() => {
        setCombinedData(tempData.concat(forecastedData));
    }, [tempData, forecastedData])

    return(
        <Grid item xs={12} md={12} lg={12}>
            <Grid
                container
                item
                xs={12}
                md={12}
                lg={12}
                justify="space-between"
                style={{paddingRight: 10, paddingLeft: 10, paddingTop: 10}}
            >
                {/* Sets the title bar for Temperature chart with Title, Date Picker and Refresh button */}
                <Typography>Temperature</Typography>
                <div style={{justifyContent: 'center'}}>
                    <DateRangePicker
                        onChange={setDateRange}
                        value={dateRange}
                    />
                     <IconButton aria-label="refresh" onClick={refreshTemp}>
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {/* When there is data to be presented, show the chart instead of the loading screen */}
                {(combinedData.length !== 0) ? (<Chart data={combinedData}/>) : (<CircularProgress/>)}
            </Grid>
        </Grid>

    )
}

export default TemperatureVisualisation