import { addImage,setImage,removeImage } from '../../actions/storage';

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

test('should generate setImage action object',() => {

});

test('should generate removeImage action object',() => {

});