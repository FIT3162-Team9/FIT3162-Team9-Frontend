import React ,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './material-ui/Dashboard';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';



//Changing fonts https://stackoverflow.com/questions/48319372/changing-font-family-of-all-material-uiversion-1-components
//Navigation Bar/Pages https://www.youtube.com/watch?v=TAcOTvQJH-U
//Pages 
import home from './pages/home';
import Bushfire from './pages/bushfire';
import Temperature from './pages/temperature';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand',
  }
});


class App extends Component{
  render() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <Dashboard />
        </div>
      </ThemeProvider>
    
    
    // <div className="App">
    //   <Router>
    //     <Navbar/>
    //       <div className="container">
    //         <Switch>
    //           <Route exact path ="/" component={home}/>
    //           <Route exact path ="/bushfire" component={Bushfire}/>
    //           <Route exact path ="/Temperature" component={Temperature}/>
    //       </Switch>
    //       </div>
    //   </Router>
        
    // </div>
  );
  }
}

export default App;
