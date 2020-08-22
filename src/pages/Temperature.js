import React, { Component, useState } from 'react'
import Visualisation from "../components/Visualisation"
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const useStyles = makeStyles(theme => ({
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
    },
    autoHeight: {
      height: 'auto',
      width: 'auto',
  
    },
  }))

function Temperature(props) {
  const [startDate, setStartDate] = useState("2000");
  const [endDate, setEndDate] = useState("2020");
  const [temporaryStartDate, setTemporaryStartDate] = useState(null);
  const [temporaryEndDate, setTemporaryEndDate] = useState(null);


  //Requires attention: Year of start date should be earlier than year of end date.  
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (temporaryStartDate && temporaryEndDate){
      setEndDate(temporaryEndDate.getFullYear());
      setStartDate(temporaryStartDate.getFullYear());
    }
  }

  const handleChange = (date) =>{
    setTemporaryStartDate(date);
  }
  const handleChangeE = (date) =>{
    setTemporaryEndDate(date);
  }

  const classes = useStyles()
  const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
        return (
            <div>
                <Grid item xs={12} >
                  <Paper className={autoHeightPaper}>
                    {/* Requires attention: Redundancy */}
                    <div key={startDate}>
                      <div key={endDate}>
                        <Visualisation startDate={startDate} endDate={endDate}/>
                      </div>
                    </div>   
                  </Paper>   
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Start date: </label>
                      <DatePicker 
                        selected={temporaryStartDate} 
                        onChange={handleChange}
                        minDate={new Date(2000,1,1)}
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        isClearable
                        /> 
                    </div>
                    <div>
                      <label>End date : </label>
                      <DatePicker 
                        selected={temporaryEndDate} 
                        onChange={handleChangeE}
                        minDate={new Date(2000,1,1)}
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        isClearable
                        /> 
                    </div>
                    <div>
                      <input type="submit" />
                    </div>
                  </form>
                </Grid>
            </div>
           
        )
}

export default Temperature
