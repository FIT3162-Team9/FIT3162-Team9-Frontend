import React, {useState, useEffect} from "react";
import Chart from './Chart.js';
import { getMaxTemp,getMaxTemp2 } from './firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function Visualisation(props){
    const [maxTemp, setMaxTemp] = useState([]);
    const [minTemp, setMinTemp] = useState([]);
    useEffect(() => {
        getMaxTemp('IDCJAC0010', setMaxTemp, props.startDate.toString(),props.endDate.toString())
    }, [])
    {console.log('maxTemp:', maxTemp)}
    console.log(maxTemp)

    return(
        <div>
            <h1>Max Temp</h1>
            {(maxTemp.length !== 0) ? (<Chart data={maxTemp}/>) : (<CircularProgress/>)}
        </div>
    )
}

export default Visualisation