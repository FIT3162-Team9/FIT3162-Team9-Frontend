import React ,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './material-ui/Dashboard';
import './App.css';

//Navigation Bar/Pages https://www.youtube.com/watch?v=TAcOTvQJH-U
//Pages 
import home from './pages/home';
import Bushfire from './pages/bushfire';
import Temperature from './pages/Temperature';

class App extends Component{
  render() {
  return (
    <Dashboard />
    
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
