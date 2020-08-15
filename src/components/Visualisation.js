import React, {useState, useEffect} from "react";
import Chart from './Chart.js';
import { getMaxTemp } from './firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function Visualisation(){
    const [maxTemp, setMaxTemp] = useState([]);

    useEffect(() => {
        getMaxTemp('IDCJAC0010', setMaxTemp)
    }, [])

    return(
        <div>
            <h1>Max Temp</h1>
            {console.log('maxTemp:', maxTemp)}
            {(maxTemp.length !== 0) ? (<Chart data={maxTemp}/>) : (<CircularProgress/>)}
        </div>
    )
}

export default Visualisation