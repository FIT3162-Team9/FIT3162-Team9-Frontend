import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Chart from './../../pages/BushfireAnalysis/AnalysisChart'

it("AnalysisChart renders without crashing", () => {
  shallow(<Chart />);
});

it("AnalysisChart renders correctly", () => {
  const tree = shallow(<Chart />);
  expect(toJson(tree)).toMatchSnapshot();
});

