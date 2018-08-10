import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});
export const startLoginOnGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLoginOnEmail = (email,password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email,password);
  };
};

//should test
export const startCreateOnEmail = (email,password) => {
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
}

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const isEmailVerified = () => {
  return () => {   
    return firebase.auth().currentUser.emailVerified;
  }
}



export const sendEmailVerification = () => {
  return () => {
    return firebase.auth().currentUser.sendEmailVerification();
  }
}
