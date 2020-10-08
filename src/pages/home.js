import React, { Component, useState, useEffect } from 'react'
import TravelLog from './TravelLog';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Circle from './Circle'
import moment from 'moment'
import Divider from '@material-ui/core/Divider'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {      
      overflow: 'auto',
      flexGrow: 1,
      height: 'auto',
      width: 'auto',
      padding: '15px',
      paddingTop: '5px',
      margin: '15px',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    typography: {
      marginLeft: '20px',
      marginTop: '20px',
      fontSize: '20px',
      display: 'flex',
    },
    circle: {
      fontSize: '50px',
    },
    paperColor: {
      background: "linear-gradient(to right bottom, #316e80, white, white, #316e80 )" ,
    },
    outerPaper: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      padding: '20px',
      width: '80%',
      background: "linear-gradient(to right, #316e80, white, white, #316e80 )"
    },
    headerFont:{
      fontSize: '20px',
    },
    dateFont:{
      fontSize: '15px',
    },
    addButton:{
      background: '#316e80',
      fontSize: '12px',
      margin: '20px 20px 25px 20px',
      color: 'white',
    }
  }))


function Home(props) {
    const classes = useStyles()
    const autoHeightColoredPaper = clsx(classes.paper, classes.paperColor)
    const [userLog, setUserLog] = useState([]);
    const [dateRange, setDateRange] = useState([moment().subtract(13, 'months'), moment().subtract(1, 'month')]);
    const LGA = props ? props.station.LGA : undefined
    const addLog = () => {
        if (!props.station.LGA){return} 
        let tempUserLog = [userLog];
        const bushfireRatings = [32,52,23,62,30,5,6,57,87,35,75,123,53,74,85,46,2,5]
        let circleList = [];
        bushfireRatings.forEach((doc) => circleList.push(<Circle className={classes.circle} props={doc} />))
        tempUserLog.push(<Grid item xs={12} md={8} lg={9}>
                          <Paper className={autoHeightColoredPaper}>
                            <Typography className={classes.typography}>
                              {LGA ? LGA : "No LGA Selected"} {`(${ moment(dateRange[0]).format('DD-MM-YYYY')
                                } -> ${moment(dateRange[1]).format('DD-MM-YYYY')})`}
                            </Typography>
                            {circleList}
                          </Paper>
                          <Divider/>
                        </Grid>
                          );
        setUserLog(tempUserLog);
       
    }
    useEffect(() => {
    }, [userLog])
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Paper className={classes.outerPaper}>
                     <Grid item xs={12} md={8} lg={9}>
                        <Typography className={classes.headerFont}>
                            SELECTED LGA: {LGA ? LGA : "None"} 
                        </Typography>
                        <DateRangePicker className={classes.dateFont}
                          onChange={setDateRange}
                          value={dateRange}
                          />
                        <Button className={classes.addButton} onClick={()=>addLog()}>
                            Add User Log
                        </Button>
                        <Divider></Divider>
                    </Grid>            
                    {userLog}
                  </Paper>
                </Grid>
            </Container>
        )
    }

export default Home
