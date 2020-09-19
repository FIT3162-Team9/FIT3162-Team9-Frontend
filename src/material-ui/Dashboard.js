import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, formatMs } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Items from './listItems';
import Chart from './Chart';
import './../fonts/Quicksand-Regular.ttf';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import home from './../pages/home';
import Bushfire from './../pages/bushfire';
import Temperature from '../pages/Temperature';
import About from './../pages/about';
import "./../App.css";


//Base Template from Material-UI
//https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton> */}
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
          {/* <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div> */}
          <List className={classes.mainItems}> <Items action={handleSelectedPage} /> </List>
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <Switch>
              <Route exact path ="/" component={home}/>
              <Route exact path ="/bushfire" component={Bushfire}/>
              <Route exact path ="/temperature" component={Temperature}/>
              <Route exact path ="/about" component={About}/>
            </Switch>
          {/* <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              Chart 
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart />
                </Paper>
              </Grid>
              Recent Deposits
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits />
                </Paper>
              </Grid>
              Recent Orders 
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container> */}
        </main>
    </div>
    </Router>
    
  );
}
