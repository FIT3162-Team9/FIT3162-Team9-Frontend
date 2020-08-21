import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import "./../App.css";

export class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/Temperature">Temperature</Button>
                    <Button color="inherit" component={Link} to="/Bushfire">Bushfire</Button> 
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
