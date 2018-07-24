import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../components/SignupPage';

test('should render SignInBox correctly', () => {
    const wrapper = shallow(<SignupPage/>);
    expect(wrapper).toMatchSnapshot();
});


