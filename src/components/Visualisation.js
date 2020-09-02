import React, {useState, useEffect} from "react";
import Chart from './Chart.js';
import { getTemperature } from './firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import moment from 'moment';

import Title from './Title';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

function Visualisation(){
    const [tempData, setTempData] = useState([]);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);

    useEffect(() => {
        refreshTemp();
    }, [])

    function refreshTemp() {
        let formattedDateRange = dateRange.map(date => moment(date).unix());
        console.log('dateRange', formattedDateRange);
        const startTimestamp = formattedDateRange[0];
        const endTimestamp = formattedDateRange[1]
        getTemperature('76031', setTempData, startTimestamp, endTimestamp);
    }

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
                <Typography>Min Temperature</Typography>
                <div>
                    <IconButton aria-label="refresh" onClick={refreshTemp}>
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                    <DateRangePicker
                        onChange={setDateRange}
                        value={dateRange}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {(tempData.length !== 0) ? (<Chart data={tempData}/>) : (<CircularProgress/>)}
            </Grid>
        </Grid>

    )
}

export default Visualisation