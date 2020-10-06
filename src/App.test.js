import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import About from './pages/About'
import TravelLog from './pages/TravelLog'


it("About page renders without crashing", () => {
  shallow(<About />);
});

it("TravelLog renders without crashing", () => {
  shallow(<TravelLog />);
});

it("About page renders correctly", () => {
  const tree = shallow(<About />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("TravelLog renders correctly", () => {
  const tree = shallow(<TravelLog />);
  expect(toJson(tree)).toMatchSnapshot();
});
