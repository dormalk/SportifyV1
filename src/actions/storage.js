import database,{ firebase } from '../firebase/firebase';
import { Promise } from 'firebase';


//ADD IMAGES
export const startUploadImage = (picture) => {
    return (dispatch) => {
        var storageRef = firebase.storage().ref();
        var imagesRef = storageRef.child('images');
        var fileRef = imagesRef.child(picture.name);
        return fileRef.put(picture).then(() => {
            return fileRef.getDownloadURL().then((url) => {
                dispatch(startAddImage({src:url,name:picture.name}));
                return Promise.resolve(url);
            });
        });
    };
};


export const startAddImage = (ImageData) => {
    return(dispatch) => {
        const {
            src = '',
            name = ''
        } = ImageData;
        const image = {src,name};
        return database.ref('images').push(image).then((ref) => {
            dispatch(addImage({
                id:ref.key,
                ...image
            }));
        });
    };
};

export const addImage = (image) => ({
    type: 'ADD_IMAGE',
    image
});



//SET IMAGES
export const setImage = (images) => ({
    type: 'SET_IMAGE',
    images
});


export const startSetImage = () => {
    return(dispatch) => {
        return database.ref('images').once('value').then((snapshot) => {
            const images = [];
            snapshot.forEach((childSnapshot) => {
                images.push({
                    id:childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setImage(images));
        });
    }
}


//REMOVE_ITEM
export const removeImage = ({id}) => ({
    type: 'REMOVE_IMAGE',
    id
});


export const startRemoveImage = ({id = {}}) => {
    return(dispatch) => {
        return database.ref(`images/${id}`).remove().then(() => {
            dispatch(removeImage({id}));
        });
    }
}