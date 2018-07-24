import React from 'react';
import { shallow } from 'enzyme';
import { SignInBox } from '../../components/SignInBox';

test('should render SignInBox correctly', () => {
    const wrapper = shallow(<SignInBox startLoginOnGoogle={() => { }}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLoginOnGoogle on button click', () => {
    const startLoginOnGoogle = jest.fn();
    const wrapper = shallow(<SignInBox startLoginOnGoogle={startLoginOnGoogle}/>);
    wrapper.find('.login__google').simulate('click');
    expect(startLoginOnGoogle).toHaveBeenCalled();
});


test('should set email on input change', () => {
    const value = 'example@gmail.com';
    const wrapper = shallow(<SignInBox />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('email')).toBe(value);
});


test('should set password on input change', () => {
    const value = '12345';
    const wrapper = shallow(<SignInBox />);
    wrapper.find('input').at(1).simulate('change', {
      target: { value }
    });
    expect(wrapper.state('password')).toBe(value); 
});


test('should call startLoginOnEmail on submit form if email and password valid', () => {
    const startLoginOnEmail = jest.fn();
    const password = '123456';
    const email = 'example@gmail.com';

    const wrapper = shallow(<SignInBox startLoginOnEmail={startLoginOnEmail} password={password} email={email}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(startLoginOnEmail).toHaveBeenCalled();
});


test('should not call startLoginOnEmail on submit form if password not valid', () => {
    const startLoginOnEmail = jest.fn();
    const password = '1234';
    const email = 'example@gmail.com';

    const wrapper = shallow(<SignInBox startLoginOnEmail={startLoginOnEmail} password={password} email={email}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(startLoginOnEmail).not.toHaveBeenCalled();
});


test('should not call startLoginOnEmail on submit form if email not valid', () => {
    const startLoginOnEmail = jest.fn();
    const password = '123456';
    const email = 'examplegmail.com';

    const wrapper = shallow(<SignInBox startLoginOnEmail={startLoginOnEmail} password={password} email={email}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(startLoginOnEmail).not.toHaveBeenCalled();
});