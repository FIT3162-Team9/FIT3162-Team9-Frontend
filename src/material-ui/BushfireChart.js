import React,{Component,useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';
import {
  AreaChart, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';


// import { bitcoin as data } from './data/data-visualisation';
//https://devexpress.github.io/devextreme-reactive/react/chart/demos/line/spline/


function formatXAxis(tickItem) {
  return moment.unix(tickItem).format('YYYY-MM-DD')
}

const titleStyles = {
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
};
const Text = withStyles(titleStyles)((props) => {
  const { text, classes } = props;
  const [mainText, subText] = text.split('\\n');
  return (
    <div className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </div>
  );
});

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    marginBottom: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column-reverse',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '30px',
  },
});

export default function BushfireChart(props) {
  const [chartData,setData] = useState(props.weather[3]);

  const handleFFDI = () => {

  }  
    return (
      <ResponsiveContainer height={400} width="95%">
        <LineChart data={chartData}>
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
          <YAxis unit='°C' />
          <Tooltip/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="max" stroke={'#8884d8'} dot={false}/>
          <Line type="monotone" dataKey="min" stroke={'#82ca9d'} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
   
    );
  
}

