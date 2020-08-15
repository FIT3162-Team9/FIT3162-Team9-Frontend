import React ,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

//Navigation Bar/Pages https://www.youtube.com/watch?v=TAcOTvQJH-U
//Pages 
import home from './pages/home';
import bushfire from './pages/bushfire';
import visualisation from './pages/visualisation';

class App extends Component{
  render() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <div className="container">
          
            <Switch>
              <Route exact path ="/" component={home}/>
              <Route exact path ="/bushfire" component={bushfire}/>
              <Route exact path ="/visualisation" component={visualisation}/>
          </Switch>
          </div>
      </Router>
        
    </div>
  );
  }
}

export default App;
