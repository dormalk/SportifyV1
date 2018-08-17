import React from 'react';
import { shallow } from 'enzyme';
import { 
    LetMeKnowYouMorePage,
    YourHobbies,
    YourAge,
    YourGender,
    CheckDetail,
} from '../../components/LetMeKnowYouMorePage';

test('should render LetMeKnowYouMore correctly', () => {
    const wrapper = shallow(<LetMeKnowYouMorePage/>);
    expect(wrapper).toMatchSnapshot();
});

test('should update fname/lname on form load correctly', () => {
    const user = {
        fname: 'Yosi',
        lname: 'Nimelman'
    }
    const wrapper = shallow(<LetMeKnowYouMorePage user={user}/>);
    expect(wrapper.state('user').fname).toBe(user.fname);
    expect(wrapper.state('user').lname).toBe(user.lname);
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

test('should render YourGender correctly', () => {
    const wrapper = shallow(<YourGender/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render CheckDetail correctly', () => {
    const wrapper = shallow(<CheckDetail/>);
    expect(wrapper).toMatchSnapshot();
});