import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, formatMs } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Items from './NavbarItem';
import './../fonts/Quicksand-Regular.ttf';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import home from '../pages/Home';
import Bushfire from '../pages/Bushfire';
import Temperature from '../pages/Temperature';
import About from '../pages/About';
import "./../App.css";


//Base Template from Material-UI
//https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates


const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Quicksand',
    display: 'flex',
  },
  toolbar: {
    background: "linear-gradient(to right,rgba(7,71,67,.7),#40C9BF )", //"linear-gradient(to right, #40C9BF, rgba(7,180,67,.3))"
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    color: 'white',//'#255C59',
    fontFamily: 'Quicksand',
    paddingRight: '1450px',
    flexGrow: 1,
  },
  drawerPaper: {
    background: "linear-gradient(  rgb(32,150,160) ,rgb(7,71,67,.6), rgb(7,71,67,.6), rgb(7,71,67,.6), rgba(7,71,67,.6), rgba(7,71,67,.6), rgba(7,71,67,.5), rgba(7,71,67,.5), rgb(64,201,191,.2))",//"linear-gradient( #40C9BF, rgba(7,71,67,.5),rgba(7,71,67,.37),rgb(64,201,191,.2))",
    position: 'relative',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    width: drawerWidth ,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    fontFamily: 'Quicksand',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  appName:{
    fontFamily: 'Quicksand',
    fontSize: '28px',
    transform: '[{rotate: -90deg}]',
    color: 'white',//'#255C59',
    textAlign: 'center',
    paddingTop: '16px',
  },
  mainItems:{
    padding: '60px 8px',
    textAlign: 'center',
    color: 'white',
  },
  test:{
     fontSize: '100px',
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  const handleSelectedPage = () => {
    console.log("works");
   };

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Switch>
              <Route exact path ="/">DASHBOARD</Route>
              <Route exact path ="/temperature">VISUALISATION </Route>
              <Route exact path ="/bushfire">ANALYSIS</Route>
              <Route exact path ="/about">ABOUT</Route>
            </Switch>
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
        <Typography
              component="h1"
              variant="h5"
              color="white"
              className={classes.appName}
            >
              S P △ R K
            </Typography>
          <List className={classes.mainItems}> <Items action={handleSelectedPage} /> </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path ="/" component={home}/>
              <Route exact path ="/bushfire" component={Bushfire}/>
              <Route exact path ="/temperature" component={Temperature}/>
              <Route exact path ="/about" component={About}/>
            </Switch>
        </main>
    </div>
    </Router>
    
  );
}
