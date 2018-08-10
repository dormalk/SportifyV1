const imagesReducerDefault = [];

export default (state = imagesReducerDefault,action) => {
    switch(action.type) {
        case 'ADD_IMAGE':
            return [
                ...state,
                action.image
            ];
        case 'REMOVE_IMAGE':
            return state.filter(({id}) => id !== action.id);
        case 'SET_IMAGE':
            return action.images;
        default:
            return state;

    }
};
