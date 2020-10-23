import React from 'react';
import { render } from '@testing-library/react';

import { shallow, mount } from "enzyme";
import { act } from 'react-dom/test-utils';
import toJson from "enzyme-to-json";
import About from './pages/About'
import {FFDI} from './pages/BushfireAnalysis/FFDI';
import Home from './pages/Dashboard';
import ShallowRenderer from 'react-test-renderer/shallow';
import CircularProgressWithLabel,{bushfireColor} from './pages/Dashboard/Circle';
import Dashboard, {Routes} from './pages';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Temperature from './pages/TemperatureAnalysis';
import {testing} from './helpers/TemperatureApi';
import Popup from './components/Popup';



describe('FFDI: Function should return correct bushfire rating', () => {
  it('Test Case 1 ~ Input{temperature:40,humidity:40,windspeed:40,droughtfactor:5} -> Output{bushfirerating:15.48}', () => {
     expect(FFDI(40,{humidity:40,windspeed:40},5)).toBe(15.48)
  });

  it('Test Case 2 ~ Input{temperature:40,humidity:50,windspeed:80,droughtfactor:8} -> Output{bushfirerating:44.45}', () => {
    expect(FFDI(40,{humidity:50,windspeed:80},8)).toBe(44.45)
 });
  it('Test Case 3 ~ Input{temperature:60,humidity:100,windspeed:200,droughtfactor:10} -> Output{bushfirerating:150}', () => {
    expect(FFDI(60,{humidity:100,windspeed:200},10)).toBe(150);
  
});
});








// describe('routes using memory router', () => {

//   it('should show Home component for / router (using memory router)', () => {
//     const component = mount(<MemoryRouter initialentries="{['/about]}" initialIndex={0}>
//         <Routes/>
//      </MemoryRouter>
//     );
//     expect(component.find(<About/>)).toHaveLength(1);
//   })


// })

// it("navigates home when you click the logo", async => {
//   // in a real test a renderer like "@testing-library/react"
//   // would take care of setting up the DOM elements
//   const root = document.createElement('div');
//   document.body.appendChild(root);

//   // Render app
//   render(
//     <MemoryRouter initialEntries={['/my/initial/route']}>
//       <App />
//     </MemoryRouter>,
//     root
//   );

//   // Interact with page
//   act(() => {
//     // Find the link (perhaps using the text content)
//     const goHomeLink = document.querySelector('#nav-logo-home');
//     // Click it
//     goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   // Check correct page content showed up
//   expect(document.body.textContent).toBe('Home');
// });

// describe('api call', () => {
//   it('success', () =>{
//     expect(testing()).toBe([])
//   } )
// }) 

