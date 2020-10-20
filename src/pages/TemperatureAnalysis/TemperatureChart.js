import React, { PureComponent } from 'react';
import '../../App.css'
import {
  AreaChart, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

function formatXAxis(tickItem) {
  return moment.unix(tickItem).format('YYYY-MM-DD')
}

export default ({ data }) => {
  let newData =[]
  data.forEach((doc) => newData.push({max: doc['max'], min: doc['min'], date:`${doc['day']}-${doc['month']}-${doc['year']}`}))

  return (
      <ResponsiveContainer height={300} width="95%">
        <LineChart data={newData}>
          <XAxis dataKey="date" />
          <YAxis unit='°C' />
          <Tooltip/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="max" stroke={'#8884d8'} dot={false}/>
          <Line type="monotone" dataKey="min" stroke={'#82ca9d'} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
  )
}