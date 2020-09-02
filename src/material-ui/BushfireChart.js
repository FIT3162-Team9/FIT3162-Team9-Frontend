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


// import { bitcoin as data } from './data/data-visualisation';
//https://devexpress.github.io/devextreme-reactive/react/chart/demos/line/spline/

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

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
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries
            name={"RH: " + props.weather[0] + "%"}
            valueField="hydr"
            argumentField="year"
            seriesComponent={Line}
          />
          <LineSeries
            name={"Wind speed: " + props.weather[1] + "km/h"}
            valueField="usa"
            argumentField="year"
            seriesComponent={Line}
          />
          
          <LineSeries
            name={"Drought factor: " + props.weather[2]}
            valueField="gas"
            argumentField="year"
            seriesComponent={Line}
          />
          <LineSeries
            name="Temperature"
            valueField="Temperature"
            argumentField="year"
            seriesComponent={Line}
          />
          <LineSeries
            name="Bushfire"
            valueField="Bushfire"
            argumentField="year"
            seriesComponent={Line}
          />
          {/* <LineSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
            seriesComponent={Line}
          /> */}
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title
            text="Bushfire Risk Analysis\n"
            textComponent={Text}
          />
          <Animation />
        </Chart>
      </Paper>
   
    );
  
}
