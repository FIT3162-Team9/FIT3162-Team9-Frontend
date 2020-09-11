//import * as React from 'react';
import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from 'react-router-dom/Link'
import { makeStyles, formatMs } from '@material-ui/core/styles';
import {BrowserRouter as Router} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  active:{
     backgroundColor: 'rgb(19, 61, 82,.7)',
     borderRadius: '18px',
     paddingTop: '1px',
     paddingBottom: '1px',
     paddingRight: '1px',
     marginTop:'10px',
     
     '&:hover': { //overwrites original hover effect from ListItem component
      textDecoration: 'none',
      backgroundColor: 'rgba(7,71,67,.5)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    } 
  },
  nonactive:{
    borderRadius: '18px',
     paddingTop: '1px',
     paddingBottom: '1px',
     marginTop:'10px',
     paddingRight: '1px',
  },
  textFont:{
    fontFamily: 'Quicksand',
    fontSize: '17px',
    color: 'white',
  },
}));


export const mainListItems = (
  <div>
      <ListItem button component={Link} to="/" >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/temperature">
        <ListItemIcon>
          <WbSunnyIcon />
        </ListItemIcon>
        <ListItemText primary="Temperature" />
      </ListItem>
      <ListItem button component={Link} to="/bushfire" >
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="Bushfire Risk" />
      </ListItem>
      <ListItem button component={Link} to="/about">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
  
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);

function Items(props) {
  const classes = useStyles();
  const [stateDashboard, setStateDashboard] = React.useState(false);
  const [stateTemperature, setStateTemperature] = React.useState(false);
  const [stateBushfire, setStateBushfire] = React.useState(false);
  const [stateAbout, setStateAbout] = React.useState(false);
  
  const disableBar = () =>{
    setStateDashboard(false);
    setStateTemperature(false);
    setStateBushfire(false);
    setStateAbout(false);
  }

  const handleSelectedPage = (id) => {
    if (id === "Dashboard" && !stateDashboard){
      disableBar();
      setStateDashboard(!stateDashboard);
    }
    else if(id === "Temperature"&& !stateTemperature){
      disableBar();
      setStateTemperature(!stateTemperature);
    }
    else if(id === "Bushfire"&& !stateBushfire){
      disableBar();
      setStateBushfire(!stateBushfire);
    }
    else if(id === "About" && !stateAbout){
        disableBar();
        setStateAbout(!stateAbout);
    }
  };

  return ( 
    <div>
      <ListItem button id={"Dashboard"} className={stateDashboard ? classes.active:classes.nonactive} onClick={() => handleSelectedPage("Dashboard")} component={Link} to="/" >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText disableTypography className={classes.textFont} primary="Dashboard" />
      </ListItem>
      <ListItem button id={"Temperature"} className={stateTemperature ? classes.active:classes.nonactive} onClick={() => handleSelectedPage("Temperature")} component={Link} to="/temperature">
        <ListItemIcon>
          <WbSunnyIcon />
        </ListItemIcon>
        <ListItemText disableTypography className={classes.textFont} primary="Temperature" />
      </ListItem>
      <ListItem button id={"Bushfire"} className={stateBushfire ? classes.active:classes.nonactive} onClick={() => handleSelectedPage("Bushfire")} component={Link} to="/bushfire" >
        <ListItemIcon>
          <WhatshotIcon/>
        </ListItemIcon>
        <ListItemText disableTypography className={classes.textFont}  primary="Bushfire Risk" />
      </ListItem>
      <ListItem button id={"About"} className={stateAbout ? classes.active:classes.nonactive} onClick={() => handleSelectedPage("About")} component={Link} to="/about">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText disableTypography className={classes.textFont}  primary="About" />
      </ListItem>
  
  </div>
  )

}

export default Items