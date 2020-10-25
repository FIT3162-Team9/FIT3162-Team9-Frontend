import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Visualisation from "../VisualisationContainer";
import Chart from "../TemperatureChart";
import Temperature from "..";

describe("Temperature Component Test", () => {
  it("Temperature component renders without crashing", () => {
    shallow(<Temperature />);
  });

  it("Temperature component renders correctly", () => {
    const tree = shallow(<Temperature />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});

describe("Visualisation Component Test", () => {
  it("Visualisation component renders without crashing", () => {
    shallow(<Visualisation />);
  });

  // it("Visualisation component renders correctly", () => {
  //   const tree = shallow(<Visualisation />);
  //   expect(toJson(tree)).toMatchSnapshot();
  // });
});

describe("TemperatureChart Component Test", () => {
  it("TemperatureChart component renders without crashing", () => {
    shallow(<Chart />);
  });

  it("TemperatureChart component renders correctly", () => {
    const tree = shallow(<Chart />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
