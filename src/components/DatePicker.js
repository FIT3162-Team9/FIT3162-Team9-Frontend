import React ,{Component} from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(themes=> ({
    container: { 
        padding: themes.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textField: {
    },
  }))

function DatePicker(props){

    const classes = useStyles();
    return(
        
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label = {props.date}
                type="date"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                InputProps={{inputProps: { min: "2000-01-01", max: "2020-08-22"} }}
            />
        </form>
    )
}

export default DatePicker;