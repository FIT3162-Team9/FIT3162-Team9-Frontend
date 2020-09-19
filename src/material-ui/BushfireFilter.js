import React,{Component} from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import WhatshotSharpIcon from "@material-ui/icons/WhatshotSharp";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import WbSunnySharpIcon from '@material-ui/icons/WbSunnySharp';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import HorizontalSplitRoundedIcon from '@material-ui/icons/HorizontalSplitRounded';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);


const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'Quicksand',
    },
    filter: {
        fontSize: '30px',
      
    },
   
  }))

export default function BushfireFilter(props) {
  const classes = useStyles()
  

  const handleChange = (event) => {
    props.method.setState({ ...props.method.state, [event.target.name]: event.target.checked });
   
  };


  return(
      <div style={{
        position: 'absolute', 
        left: '50%', 
       
        transform: 'translate(-60%)'
    }}>
    <FormGroup row>
        <FormControlLabel
        control={
        <Checkbox
            icon={<WbSunnyOutlinedIcon />}
            checkedIcon={<WbSunnyOutlinedIcon />}
            name="temperature"
            onChange = {handleChange}
            style ={{
                color: props.method.state.temperature ? "orange" : "grey"

            }}
        />
        }
        label="Temperature"
    />
    <FormControlLabel
        control={
        <Checkbox
            icon={<WhatshotSharpIcon />}
            checkedIcon={<WhatshotSharpIcon />}
            name="bushfireratings"
            onChange = {handleChange}
            style ={{
                color: props.method.state.bushfireratings ? "red" : "grey",
               

            }}
        />
        }
        className = {classes.filter}
        label="Bushfire Ratings"
    />
    <FormControlLabel
        control={
        <Checkbox
            icon={<HorizontalSplitRoundedIcon />}
            checkedIcon={<HorizontalSplitRoundedIcon />}
            name="bushfirezone"
            onChange = {handleChange}
            style ={{
                color: props.method.state.bushfirezone   ? "black" : "grey"

            }}
        className={classes.filter}
        />
        }
        label="Bushfire Zone"
    />
  </FormGroup>
  </div>
  );
}