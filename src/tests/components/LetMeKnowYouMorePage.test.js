import React from 'react';
import { shallow,mount } from 'enzyme';
import { 
    LetMeKnowYouMorePage,
    YourHobbies,
    YourAge,
    YourGender,
    CheckDetail,
} from '../../components/LetMeKnowYouMorePage';
import users from '../fixtures/users';
import database from '../../firebase/firebase';


test('should render LetMeKnowYouMore correctly', () => {
    const wrapper = shallow(<LetMeKnowYouMorePage/>);
    expect(wrapper).toMatchSnapshot();
});

test('should update fname on form load correctly', () => {
    const value = 'Dor';

    const wrapper = mount(<LetMeKnowYouMorePage user={users[0]}/>);
    wrapper.find('input').at(0).simulate('change',
        {target:{value}});
    wrapper.find('span').at(2).simulate('click');
    expect(wrapper.state('user').fname).toBe(value);
});


test('should update lname on form load correctly', () => {
    const value = 'Malka';
    const wrapper = mount(<LetMeKnowYouMorePage user={users[0]}/>);
    wrapper.find('input').at(1).simulate('change',
        {target:{value}});
    wrapper.find('span').at(4).simulate('click');
    expect(wrapper.state('user').lname).toBe(value);
});


test('should update fname/lname onClick button of CheckDetail', () => {
    const wrapper = shallow(<LetMeKnowYouMorePage user={users[0]}/>);
    expect(wrapper.state('user').fname).toBe(users[0].fname);
    expect(wrapper.state('user').lname).toBe(users[0].lname);
});


test('should render YourHobbies correctly', () => {
    const onHobbieEntered = jest.fn();
    const onHobbieRemoved = jest.fn();
    const onHobbieChanged = jest.fn();
    const onHobbieChangedFromSuggest = jest.fn();
    const suggestHobbie = jest.fn();
    const Hobbies = ['כדוררשת','כדורעף','כדורסל','כדורגל'];
    const currHobbie = [''];
    const wrapper = shallow(
        <YourHobbies 
            currHobbie={currHobbie}
            Hobbies={Hobbies}
            onHobbieEntered={onHobbieEntered}
            onHobbieRemoved={onHobbieRemoved}
            onHobbieChanged={onHobbieChanged}
            onHobbieChangedFromSuggest={onHobbieChangedFromSuggest}
            suggestHobbie={suggestHobbie}
            />
        );
    expect(wrapper).toMatchSnapshot();
});

test('should render YourAge correctly', () => {
    const wrapper = shallow(<YourAge/>);
    expect(wrapper).toMatchSnapshot();
});


test('should change detail property of state', () => {
    const gender = 'זכר';
    const age = 28;
    const hobbie = 'כדורגל';
    const moto = 'belive';

    const startEditUser = jest.fn();
    const wrapper = mount(<LetMeKnowYouMorePage user={users[0]} startEditUser={startEditUser}/>);

    wrapper.find('button').at(0).simulate('click');
    wrapper.find('input[type="radio"]').at(0).simulate('change',{target:{value:gender}});
    expect(wrapper.state('user').detail.gender).toBe(gender);

    wrapper.find('input[type="number"]').at(0).simulate('change',{target:{value:age}});
    expect(wrapper.state('user').detail.age).toBe(age);

    wrapper.find('input[type="text"]').at(0).simulate('change',{target:{value:hobbie}});
    wrapper.find('.suggestion').simulate('click',{target:{hobbie}});
    expect(wrapper.state('user').detail.hobbies[0]).toBe(hobbie);

    wrapper.find('.curr_hobbie button').simulate('click',{target:{hobbie}});
    expect(wrapper.state('user').detail.hobbies.length).toBe(0);

    wrapper.find('input[type="text"]').at(0).simulate('change',{target:{value:hobbie}});
    wrapper.find('.suggestion').simulate('click',{target:{hobbie}});
    wrapper.find('input[type="text"]').at(1).simulate('change',{target:{value:moto}});
    expect(wrapper.state('user').detail.moto).toBe(moto);

    wrapper.find('.let_me_know_you_more___finish_button').simulate('click',{preventDefault() {}});
    expect(startEditUser).toHaveBeenCalled();
});

test('should render YourGender correctly', () => {
    const wrapper = shallow(<YourGender/>);
    expect(wrapper).toMatchSnapshot();
});


test('should render CheckDetail correctly', () => {
    const wrapper = shallow(<CheckDetail/>);
    expect(wrapper).toMatchSnapshot();
});