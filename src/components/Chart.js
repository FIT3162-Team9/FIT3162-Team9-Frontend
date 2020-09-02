import React, { PureComponent } from 'react';
import './../App.css'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

function formatXAxis(tickItem) {
  return moment.unix(tickItem).format('YYYY-MM-DD')
}


export default ({ data }) => {
  
  return (
      <ResponsiveContainer height={300} width="95%">
        <AreaChart data={data} >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#FAD6A5" stopOpacity={0.8} />
              <stop offset="99%" stopColor="#FAD6A5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#ABD1F3" stopOpacity={0.8} />
              <stop offset="99%" stopColor="#ABD1F3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
          <YAxis unit='°C' />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="min" stroke="#FAD6A5" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
  )
}