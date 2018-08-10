
import React from 'react';
import { shallow } from 'enzyme';
import LoginAccountPage from '../../components/LoginAccountPage';

test('should render LoginAccountPage correctly', () => {
    const wrapper = shallow(<LoginAccountPage/>);
    expect(wrapper).toMatchSnapshot();
});