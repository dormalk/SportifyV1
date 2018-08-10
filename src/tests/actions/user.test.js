import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    setUser,
    startSetUser,
    startCreateNewUser,
    editUser,
    startEditUser
} from '../../actions/user';
import users from '../fixtures/users';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const usersData = {};
    users.forEach(({fname,lname,profile,frineds},i) => {
        usersData[i] = {fname,lname,profile,frineds};
    });
    database.ref(`users`).set(usersData).then(() => done());
});

test('should setup set user action object' , () => {
    const action = setUser(users[0]);
    expect(action).toEqual({
        type: 'SET_USER',
        user: users[0]
    })
});

test('should fatch user from firebase', (done) => {
    const uid = '2';
    const store = createMockStore({auth: {uid}});
    store.dispatch(startSetUser()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_USER',
            user: {
                fname: users[2].fname,
                lname: users[2].lname,
                profile: users[2].profile,
            }
        });
        done();
    });
});

test('should setup edit user action object' , () => {
    const action = editUser({fname:'yossi'});
    expect(action).toEqual({
        type: 'EDIT_USER',
        updates:{
            fname:'yossi'
        }
    });
});


test('should edit user on firebase', (done) => {
    const uid = '2';
    const store = createMockStore({auth: {uid}});
    const updates = {
        fname:'yossi'
    }
    store.dispatch(startEditUser(updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_USER',
            updates: {
                fname: updates.fname
            }
        });

        return database.ref(`users/${uid}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().fname).toBe(updates.fname);
        done();
    });
});


test('should create new user in firebase', () => {
    const newUser = {
        fname: 'yossi',
        lname: 'maman',
        email: 'gg@gmail.com',
        password: '12345',
        profile: ''
    };
    const store = createMockStore();
    store.dispatch(startCreateNewUser(newUser)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_USER',
            user: newUser 
        })
        const uid = store.getState().auth.uid;
        return database.ref(`users/${uid}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(newUser);
        done();
    });
});