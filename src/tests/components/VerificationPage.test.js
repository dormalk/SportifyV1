import React from 'react';
import { shallow } from 'enzyme';
import { VerificationPage } from '../../components/VerificationPage';

test('should render VerificationPage correctly', () => {
    const wrapper = shallow(<VerificationPage/>);
    expect(wrapper).toMatchSnapshot();
});


test('should call sendEmailVerification function on button click', () => {
    const sendEmailVerification = jest.fn();
    const wrapper = shallow(<VerificationPage sendEmailVerification={sendEmailVerification}/>);
    wrapper.find('button').simulate('click',{preventDefault() {}});
    expect(sendEmailVerification).toHaveBeenCalled();
});
