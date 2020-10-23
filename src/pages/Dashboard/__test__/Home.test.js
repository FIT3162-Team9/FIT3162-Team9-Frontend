import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Home from './..'
import { render } from '@testing-library/react';
import CircularProgressWithLabel,{bushfireColor} from './../Circle';

it("Home renders without crashing", () => {
  shallow(<Home LGA='banyule' station='86036' />);
});

it("Home renders correctly", () => {
  const tree = shallow(<Home LGA='banyule' station='86036' />);
  expect(toJson(tree)).toMatchSnapshot();
});


describe("Location displayed correctly", () => {
  it("LGA and Station ID displayed correctly on screen", () => {
    const {getByText}= render(<Home LGA='Banyule' station='76031' />);
    expect(getByText(/Banyule/i)).toBeInTheDocument();
  });
});

describe('Circle display correct data', () => {

  it('Date displayed correctly', () =>{
    const {getByText} = render(<CircularProgressWithLabel day={17} month={3} bushfirerating={19.97}/>);
    expect(getByText('17/3')).toBeInTheDocument();  
  });

  it('Bushfire rating displayed correctly', () =>{
    const {getByText} = render(<CircularProgressWithLabel day={17} month={3} bushfirerating={19.97}/>);
    expect(getByText('19.9')).toBeInTheDocument();  
  });

  it('Color returned correctly', () =>{
    expect(bushfireColor(80)).toBe('#ff4040');
  });
});