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
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {      
      overflow: 'auto',
      
    },
    autoHeight: {
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
      fontSize: '25px',
      display: 'flex',
    },
    circle: {
      fontSize: '50px',
    },
    paperColor: {
      background: "linear-gradient(to right bottom, #316e80, white, white, #316e80 )" ,
    },
    paperPadding: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      padding: '20px',
      width: '80%',
    }
  }))


function Home(props) {
    const classes = useStyles()
    const autoHeightPaper = clsx(classes.paper, classes.autoHeight)
    const autoHeightColoredPaper = clsx(classes.paper, classes.autoHeight, classes.paperColor)
    const [userLog, setUserLog] = useState([]);

    const LGA = props ? props.station.LGA : undefined
    const addLog = () => {
        //if (!props.station.LGA){return} 
        let tempUserLog = [userLog];
        const bushfireRatings = [32,52,23,62,30,5,6,57,87,35,75,123,53,74,85,46,2,5]
        let circleList = [];
        bushfireRatings.forEach((doc) => circleList.push(<Circle className={classes.circle} props={doc} />))
        tempUserLog.push(<Grid item xs={12} md={8} lg={9}>
                          <Paper className={autoHeightColoredPaper}>
                            <Typography className={classes.typography}>
                              {LGA ? LGA : "No LGA Selected"}
                            </Typography>
                            {circleList}
                          </Paper>
                        </Grid>
                          );
        setUserLog(tempUserLog);
       
        
    }
    useEffect(() => {
    }, [userLog])
    

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Paper className={classes.paperPadding}>
                     <Grid item xs={12} md={8} lg={9}>
                            <Typography>
                                Add user log
                            </Typography>
                            <Button onClick={()=>addLog()}>
                                +
                            </Button>
                    </Grid>            
                    {userLog}
                  </Paper>
                </Grid>
                
            </Container>
        )
    }

export default Home
