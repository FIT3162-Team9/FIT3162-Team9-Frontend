import React, {useState, useEffect} from "react";
import Chart from './AnalysisChart.js';
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

import DateRangePicker from '@wojtekmaj/react-daterange-picker';

function Analysis(props){
    
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
                <Typography>Bushfire Analysis</Typography>
                <div style={{justifyContent: 'center'}}>
                    {/* <FormControl size="small" style={{paddingRight: 10, paddingLeft: 10 }}>
                        <Select
                            labelId="station-id-label"
                            id="station-id"
                            value={props.method.stationId}
                            onChange={props.method.handleStationIdChange}
                        >
                            {props.method.validStationIds.map(id => <MenuItem value={id}>{id}</MenuItem>)}
                        </Select>
                    </FormControl> */}
                    <DateRangePicker
                        onChange={props.method.setDateRange}
                        value={props.method.dateRange}
                    />
                     <IconButton aria-label="refresh" onClick={props.method.refreshTemp}>
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {(props.method.tempData.length !== 0) ? (<Chart data={{data:props.method.tempData, state:props.method.state}}/>) : (<CircularProgress/>)}
            </Grid>
        </Grid>

    )
}

export default Analysis