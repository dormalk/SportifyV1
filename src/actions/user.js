//test all
import database,{ firebase } from '../firebase/firebase';
import { startCreateOnEmail, startLoginOnGoogle } from './auth';

export const startCreateNewUser = (userData) => {
    return(dispatch) => {
        const{
            fname = '',
            lname = '',
            email = '',
            password = '',
            profile = '',
            frineds = []
        } = userData;
        const user = {fname,lname,email,profile,frineds};
        return dispatch(startCreateOnEmail(email,password)).then((authUser) => {
            database.ref(`users/${authUser.uid}`).set(user).then(() => {
                dispatch(setUser(user));
                return firebase.auth().currentUser.sendEmailVerification();
            });
        });
    };
};


export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const startSetUser = () => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}`).once('value').then((snapshot) => {
            dispatch(setUser(snapshot.val()));
        });
    };
}

export const editUser = (updates) => ({
    type: 'EDIT_USER',
    updates
});


export const startEditUser = (updates) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}`).update(updates).then(() => {
            dispatch(editUser(updates));
        });
    };
};

//test
export const startCreateAccountOnGoogle = (email,password) => {
    return(dispatch) => {
        return dispatch(startLoginOnGoogle()).then((authUser) => {
            return database.ref(`users/${authUser.uid}`).once('value').then((snapshot) => {
                if(snapshot.val()){
                    dispatch(setUser(snapshot.val()));
                }
                else{
                    const googleUser = {
                        fname: authUser.user.displayName.split(" ")[0] ,
                        lname: authUser.user.displayName.split(" ")[1],
                        email: authUser.user.email,
                        profile: authUser.user.photoURL };
                    return database.ref(`users/${authUser.user.uid}`).set(googleUser).then(() => {
                        dispatch(setUser(googleUser));
                    });    
                }
            });
        });
    }
}
