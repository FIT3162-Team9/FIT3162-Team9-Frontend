import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Chart from "../AnalysisChart";
import Bushfire from "./..";
import Analysis from "../AnalysisContainer";

describe("Bushfire Component Test", () => {
  it("Bushfire component renders without crashing", () => {
    shallow(<Bushfire LGA={"Banyule"} station={"86068"} />);
  });

  it("Bushfirei component renders correctly", () => {
    const tree = shallow(<Bushfire LGA={"Banyule"} station={"86068"} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});

describe("Analysis Component Test", () => {
  it("Analysis component renders without crashing", () => {
    shallow(<Analysis tempData={[]} />);
  });

  it("Analysis component renders correctly", () => {
    const tree = shallow(<Analysis tempData={[]} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});

describe("Analysis Component Test", () => {
  it("AnalysisChart renders without crashing", () => {
    shallow(<Chart />);
  });

  it("AnalysisChart renders correctly", () => {
    const tree = shallow(<Chart />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
