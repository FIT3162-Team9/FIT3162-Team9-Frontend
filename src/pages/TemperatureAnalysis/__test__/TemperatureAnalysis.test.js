import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Chart from '../TemperatureChart'
import Temperature from '..';

it("TemperatureChart renders without crashing", () => {
  shallow(<Chart />);
});

it("TemperatureChart renders correctly", () => {
  const tree = shallow(<Chart />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("Temperature renders without crashing", () => {
  shallow(<Temperature />);
});

it("Temperature renders correctly", () => {
  const tree = shallow(<Temperature />);
  expect(toJson(tree)).toMatchSnapshot();
});
