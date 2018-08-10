import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountPage } from '../../components/CreateAccountPage';

test('should render SignInBox correctly', () => {
    const wrapper = shallow(<CreateAccountPage/>);
    expect(wrapper).toMatchSnapshot();
});


