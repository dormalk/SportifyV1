import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    addImage,
    setImage,
    removeImage,
    startAddImage,
    startSetImage,
    startRemoveImage
 } from '../../actions/storage';
 import images from '../fixtures/images';
 import database from '../../firebase/firebase';

 const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const ImagesObj = {};
    images.forEach(({ src, name },i) => {
        ImagesObj[i] = {src,name};
    });
    database.ref(`images`).set(ImagesObj).then(() => done());
});


test('should generate addImage action object',() => {
    const ImageData = {
        src: 'http://image.jpg',
        name: 'someName'
    };
    const action = addImage(ImageData);
    expect(action).toEqual({
        type:'ADD_IMAGE',
        image: ImageData
    });
});

test('should add image to database and store', (done) => {
    const store = createMockStore({});
    const imageData = {
      src: 'http://exmp4.jpg',
      name: 'exmp4'
    };
    store.dispatch(startAddImage(imageData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_IMAGE',
        image: {
            id: expect.any(String),
            ...imageData
        }
      });
      return database.ref(`images/${actions[0].image.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(imageData);
      done();
    });})

test('should generate setImage action object',() => {
    const ImageData = {
        src: 'http://image.jpg',
        name: 'someName'
    };
    const action = setImage(ImageData);
    expect(action).toEqual({
        type:'SET_IMAGE',
        images: ImageData
    });
});

test('should fatch the images from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetImage()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SET_IMAGE',
            images
        });
        done();
    })
})

test('should generate removeImage action object',() => {
    const id = "r323433y"; 
    const action = removeImage({ id });
    expect(action).toEqual({
        type:'REMOVE_IMAGE',
        id
    });
});

test('should remove image from firebase', (done) => {
    const store = createMockStore({});
    const id = images[2].id;

    store.dispatch(startRemoveImage({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_IMAGE',
            id
        });
        return database.ref(`images/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBe(null);
        done();
    });
});