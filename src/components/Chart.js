import React, { PureComponent } from 'react';
import './../App.css'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer
} from 'recharts';
//https://recharts.org/en-US/api

const data = [
  {
    name: 'Year A', maxtemp: 30, mintemp: 20,
  },
  {
    name: 'Year B', maxtemp: 35, mintemp: 16,
  },
  {
    name: 'Year C', maxtemp: 27, mintemp: 15,
  },
  {
    name: 'Year D', maxtemp: 28, mintemp: 21,
  },
  {
    name: 'Year E', maxtemp: 36, mintemp: 23,
  },
  {
    name: 'Year F', maxtemp: 24, mintemp: 12,
  },
  {
    name: 'Year G', maxtemp: 26, mintemp: 11,
  },
];

export default class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c1rLyqj1/';

  render() {
    return (
      <>
      <h1>Temperature</h1>
      <ResponsiveContainer height={300} width="50%">
      <AreaChart data={data}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="1%" stopColor="#FAD6A5" stopOpacity={0.8}/>
            <stop offset="99%" stopColor="#FAD6A5" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="1%" stopColor="#ABD1F3" stopOpacity={0.8}/>
            <stop offset="99%" stopColor="#ABD1F3" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis unit = '°C'/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="maxtemp" stroke="#FAD6A5" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="mintemp" stroke="#ABD1F3" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
    </ResponsiveContainer>
    </>
    );
  }
}

