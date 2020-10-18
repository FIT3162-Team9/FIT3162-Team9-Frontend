import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Dashboard from './..';

it("AnalysisChart renders without crashing", () => {
  shallow(<Dashboard />);
});

it("AnalysisChart renders correctly", () => {
  const tree = shallow(<Dashboard />);
  expect(toJson(tree)).toMatchSnapshot();
});
