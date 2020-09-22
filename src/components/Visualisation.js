import React, {useState, useEffect} from "react";
import Chart from './TemperatureChart';
import { getTemperature } from './firebase';
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

import Title from './Title';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { temperature as data } from './data/tempdata';

function TemperatureVisualisation(){
    const [tempData, setTempData] = useState([]);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    const [stationId, setStationId] = React.useState('76031');

    const validStationIds = ['76031', '76047', '76064']
    
    useEffect(() => {
        refreshTemp();
    }, [])

    function refreshTemp() {
        let formattedDateRange = dateRange.map(date => moment(date).unix());
        console.log('dateRange', formattedDateRange);
        const startTimestamp = formattedDateRange[0];
        const endTimestamp = formattedDateRange[1]
        // getTemperature(stationId, setTempData, startTimestamp, endTimestamp);
        setTempData(data)
    }

    const handleStationIdChange = (event) => {
        setStationId(event.target.value);
    };

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
                   

                    <FormControl size="small" style={{paddingRight: 10, paddingLeft: 10 }}>
                        <Select
                            labelId="station-id-label"
                            id="station-id"
                            value={stationId}
                            onChange={handleStationIdChange}
                        >
                            {validStationIds.map(id => <MenuItem value={id}>{id}</MenuItem>)}
                        </Select>
                    </FormControl>
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
                {(tempData.length !== 0) ? (<Chart data={tempData}/>) : (<CircularProgress/>)}
            </Grid>
        </Grid>

    )
}

export default TemperatureVisualisation