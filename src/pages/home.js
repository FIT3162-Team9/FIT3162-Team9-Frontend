import React, { Component, useState, useEffect } from 'react'
import TravelLog from './TravelLog';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginRight: '0px',
      marginBottom: '0px',
    },
    autoHeight: {
      height: '100px',
      width: 'auto',
  
    },
    sliderHeight:{
      height: 'auto',
      width: '250px',
    },
    filterHeight:{
      marginTop: '-30px',
      height: '50px',
      width: 'auto',

    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }))


function Home(props) {
    const classes = useStyles()
    const autoHeightPaper = clsx(classes.paper, classes.autoHeight)

    const [userLog, setUserLog] = useState([]);

    const addLog = () => {
        if (!props.station.LGA){return}
        let tempUserLog = [userLog];
        tempUserLog.push(<Grid item xs={12} md={8} lg={9}>
                            <Paper className={autoHeightPaper}>
                                <Typography>
                                    {[props.station.LGA]}
                                </Typography>
                            </Paper>
                        </Grid>)
        setUserLog(tempUserLog);
       
        
    }
    useEffect(() => {
        console.log(userLog);
    }, [userLog])
 

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                            <Typography>
                                Add user log
                            </Typography>
                            <Button onClick={()=>addLog()}>
                                +
                            </Button>
                    </Grid>
                    {userLog}
                </Grid>
            </Container>
        )
    }

export default Home
