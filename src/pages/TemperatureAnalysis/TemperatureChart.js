import React from "react";
import "../../App.css";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default ({ data }) => {
  let newData = [];

  //Add new key data {date} with the format "{day}-{month}-{year}"
  //where {day},{month},{year} are from input object
  if (data) {
    data.forEach((doc) =>
      newData.push({
        max: doc["max"],
        min: doc["min"],
        date: `${doc["day"]}-${doc["month"]}-${doc["year"]}`,
      })
    );
  }

  return (
    <ResponsiveContainer height={300} width="95%">
      <LineChart data={newData}>
        <XAxis dataKey="date" />
        <YAxis unit="°C" />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="max" stroke={"#8884d8"} dot={false} />
        <Line type="monotone" dataKey="min" stroke={"#82ca9d"} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
