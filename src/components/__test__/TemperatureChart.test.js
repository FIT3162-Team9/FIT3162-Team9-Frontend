import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Chart from './../TemperatureChart'

it("TemperatureChart renders without crashing", () => {
  shallow(<Chart />);
});

it("TemperatureChart renders correctly", () => {
  const tree = shallow(<Chart />);
  expect(toJson(tree)).toMatchSnapshot();
});
