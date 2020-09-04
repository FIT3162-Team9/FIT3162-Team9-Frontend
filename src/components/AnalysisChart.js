import React, { PureComponent } from 'react';
import './../App.css'
import {
  AreaChart, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

function formatXAxis(tickItem) {
  return moment.unix(tickItem).format('YYYY-MM-DD')
}

export default ({ data }) => { 
  return (
      <ResponsiveContainer height={300} width="95%">
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
          <YAxis unit='°C' />
          <Tooltip/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="max" stroke={'orange'} dot={false}/>
          <Line type="monotone" dataKey="bushfirerating" stroke={'red'} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
  )
}