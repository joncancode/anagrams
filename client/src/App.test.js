import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('general <App/> component', () => {
  it('renders correctly without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches our snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('the methods', () => {
  it('should show an instance of componentDidMount', () => {
    const wrapper = shallow(<App />); 
    wrapper.instance().componentDidMount()
  });

  it('should show an instance of handleChange', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance()
    instance.handleChange( { target: { value: "test input" } })
  });

  it('should show an instance of handleClick', () => {
    const wrapper = shallow(<App />); 
    wrapper.instance().handleClick()
  });

  it('should show an instance of runAlgorithm', () => {
    const wrapper = shallow(<App />); 
    wrapper.instance().runAnagram()
  });

});
