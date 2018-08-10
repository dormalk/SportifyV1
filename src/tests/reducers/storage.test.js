import storageReducer from '../../reducers/storage';
import images from '../fixtures/images';

test('should set default state',() => {
    const state = storageReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
});

test('should remove image by id',() => {
    const action = {
        type:'REMOVE_IMAGE',
        id: images[1].id
    };
    const state = storageReducer(images,action);
    expect(state).toEqual([images[0],images[2]]);
});

test('should not remove image if id not found',() => {
    const action = {
        type:'REMOVE_IMAGE',
        id: '-1000'
    };
    const state = storageReducer(images,action);
    expect(state).toEqual(images);
});


test('should add an image',() => {
    const image = {
        id:'5',
        src:'http://exmp5.jpg',
        name:'exmp5'
    };

    const action = {
        type:'ADD_IMAGE',
        image
    }
    const state = storageReducer(images,action);
    expect(state).toEqual([...images,image]); 
});

test('should set images',() => {
    const action = {
        type: 'SET_IMAGE',
        images: [images[1]]
    };
    const state = storageReducer(images,action);
    expect(state).toEqual([images[1]]);     
})