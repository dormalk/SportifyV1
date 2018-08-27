import database from '../firebase/firebase';

export const fatchUserByName = (value) => {
    var users = [];
    database.ref(`users/`).on('value',(snapshot) => {
        snapshot.forEach(user => {
            if(user.val().fname.toLowerCase().startsWith(value.toLowerCase()) || user.val().lname.toLowerCase().startsWith(value.toLowerCase())){
                users.push({uid:user.key,fname:user.val().fname,lname:user.val().lname});
            }
        });
    }); 
    return users;
}