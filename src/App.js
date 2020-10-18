import React ,{Component} from 'react';
import Dashboard from './pages';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { InitUser } from './helpers/UserApi';


//Changing fonts https://stackoverflow.com/questions/48319372/changing-font-family-of-all-material-uiversion-1-components
//Navigation Bar/Pages https://www.youtube.com/watch?v=TAcOTvQJH-U
//Pages 


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
          <InitUser/>
          <Dashboard />
        </div>
      </ThemeProvider>
    
  );
  }
}

export default App;
