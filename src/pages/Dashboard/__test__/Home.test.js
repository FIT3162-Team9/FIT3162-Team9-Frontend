import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Home from './..'
import { HomeSharp } from '@material-ui/icons';

it("AnalysisChart renders without crashing", () => {
  shallow(<Home LGA='banyule' station='86036' />);
});

it("AnalysisChart renders correctly", () => {
  const tree = shallow(<Home LGA='banyule' station='86036' />);
  expect(toJson(tree)).toMatchSnapshot();
});
