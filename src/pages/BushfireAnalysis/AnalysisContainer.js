import React from "react";
import Chart from "./AnalysisChart.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

/**
 * AnalysisGrid Component containing the chart component for Bushfire Analysis
 * @param   {object} props               props passed from Bushfire Component
 * @param   {func} props.setDateRange    ..
 * @param   {date} props.dateRange       start date and end date in timestamp format
 * @param   {func} props.refreshTemp     function that refreshes/updates the chart
 * @param   {[Object]} props.climateData array of climate data sets with data key {temperature},{humidity},{windspeed}
 * @param   {[string]} props.state       state of the data series to be shown on chart
 */
function AnalysisContainer(props) {
  const { setDateRange, dateRange, refreshTemp, climateData, state } = props;
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Grid
        container
        item
        xs={12}
        md={12}
        lg={12}
        justify="space-between"
        style={{ paddingRight: 10, paddingLeft: 10, paddingTop: 10 }}
      >
        <Typography>Bushfire Analysis</Typography>
        <div style={{ justifyContent: "center" }}>
          <DateRangePicker onChange={setDateRange} value={dateRange} />
          <IconButton aria-label="refresh" onClick={refreshTemp}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {climateData.length !== 0 ? (
          <Chart data={{ data: climateData, state: state }} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
}

export default AnalysisContainer;
