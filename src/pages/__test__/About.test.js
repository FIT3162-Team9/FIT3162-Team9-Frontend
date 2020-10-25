import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import About from '../About';

it("About page renders correctly", () => {
    const tree = shallow(<About />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  