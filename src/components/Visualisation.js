import React, {useState, useEffect} from "react";
import Chart from './Chart.js';
import { getTemperature } from './firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import Title from './Title';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

function Visualisation(props){
    const [tempData, setTempData] = useState([]);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);

    useEffect(() => {
        let formattedDateRange = dateRange.map(date => moment(date).unix());
        console.log('dateRange', formattedDateRange);
        const startTimestamp = formattedDateRange[0];
        const endTimestamp = formattedDateRange[1]
        getTemperature('76031', setTempData, startTimestamp, endTimestamp);
    }, [dateRange])

    return(
        <Grid xs={12} md={12} lg={12}>
            <Grid
                container
                xs={12}
                md={12}
                lg={12}
                justify="space-between"
                style={{padding: 10}}
            >
                <Typography>Temperature</Typography>
                <DateRangePicker
                    onChange={setDateRange}
                    value={dateRange}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
            {(tempData.length !== 0) ? (<Chart data={tempData}/>) : (<CircularProgress/>)}
            </Grid>
        </Grid>

    )
}

export default Visualisation