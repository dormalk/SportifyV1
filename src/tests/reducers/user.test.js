import userReducer from '../../reducers/user';
import users from '../fixtures/users';


test('should set defalut state',() => {
    const state = userReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual({});
});

test('should set provided user state', () => {
    const state = userReducer(users[0],{type:'@@INIT'});
    expect(state).toEqual(users[0]);
});

test('should edit user',() => {
    const updates = {
        fname: 'Eliyaho'
    }
    const action = {
        type:'EDIT_USER',
        updates
    }
    const state = userReducer(users[1],action);
    expect(state.fname).toEqual(updates.fname);
});