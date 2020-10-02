import React, { PureComponent } from 'react';
import './../App.css'
import {
  ComposedChart,AreaChart, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

function formatXAxis(tickItem) {
  return moment.unix(tickItem).format('YYYY-MM-DD')
}

var tooltip
const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip)    return null
    for (const bar of payload)
        if (bar.dataKey === tooltip)
            return <div>{ bar.name }<br/>{ bar.value.toFixed(2) }</div>
    return null
}

export default ({ data }) => { 

  return (
      <ResponsiveContainer height={300} width="95%">
        <ComposedChart data={data.data}>
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
          <YAxis unit='°C' />
          <Tooltip/>{/* <Tooltip content={<CustomTooltip />}/> */}
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Area type="monotone" fillOpacity="0.2" dataKey={data.state.bushfirezone ? "low" : ""} stackId="1" fill={'#addfad'} stroke={'white'}  dot={false} activeDot={false}/>
          <Area type="monotone" fillOpacity="0.2" dataKey={data.state.bushfirezone ? "high" : ""} stackId="1" fill={'#87ceeb'} stroke={'white'} dot={false} activeDot={false}/>
          <Area type="monotone" fillOpacity="0.2" dataKey={data.state.bushfirezone ? "veryhigh" : ""} stackId="1" fill={'#fcf75e'} stroke={'white'} dot={false} activeDot={false}/>
          <Area type="monotone" fillOpacity="0.2" dataKey={data.state.bushfirezone ? "severe" : ""} stackId="1" fill={'#ffa500'} stroke={'white'} dot={false} activeDot={false}/>
          <Area type="monotone" fillOpacity="0.2" dataKey={data.state.bushfirezone ? "extreme" : ""} stackId="1" fill={'#ff4040'} stroke={'white'} dot={false} activeDot={false}/>
          <Area type="monotone" fillOpacity="0.2" dataKey={data.state.bushfirezone ? "catastrophic" : ""} stackId="1" fill={'#c80815'} stroke={'white'} dot={false} activeDot={false}/>
          <Line type="monotone" dataKey={data.state.temperature ? "max" : ""} stroke={'orange'} dot={false}/>
          <Line type="monotone" dataKey={"humidity"} stroke={'blue'} dot={false}/>
          <Line type="monotone" dataKey={"windspeed"} stroke={'green'} dot={false}/>
          <Line type="monotone" dataKey= {data.state.bushfireratings ? "bushfirerating" : ""} stroke={'red'} dot={false} name="Bushfire rating" onMouseOver={ () => tooltip="pv" }/>
          
        </ComposedChart>
      </ResponsiveContainer>
  )
}