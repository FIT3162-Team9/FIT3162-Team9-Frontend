import React, {useState, useEffect} from "react";
import Chart from './TemperatureChart';
import { getTemperature, getForecastedTemperature } from '../../helpers/HumidityWindApi';
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
    const [combinedData, setCombinedData] = useState([]);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    
    useEffect(() => {
        refreshTemp();
    }, [props.station])

    function refreshTemp() {
        let formattedDateRange = dateRange.map(date => moment(date).unix());
        console.log('dateRange', formattedDateRange);
        const startTimestamp = formattedDateRange[0];
        const endTimestamp = formattedDateRange[1]
        getTemperature(props.station, setTempData, startTimestamp, endTimestamp);
        getForecastedTemperature(props.station, setForecastedData, startTimestamp, endTimestamp);
    }

    useEffect(() => {
        setCombinedData(tempData.concat(forecastedData));
    }, [tempData, forecastedData])

    return(
        <Grid xs={12} md={12} lg={12}>
            <Grid
                container
                xs={12}
                md={12}
                lg={12}
                justify="space-between"
                style={{paddingRight: 10, paddingLeft: 10, paddingTop: 10}}
            >
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
                {(combinedData.length !== 0) ? (<Chart data={combinedData}/>) : (<CircularProgress/>)}
            </Grid>
        </Grid>

    )
}

export default TemperatureVisualisation