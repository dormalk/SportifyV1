
const userReducerDefault = {};

export default (state = userReducerDefault,action) => {
    switch(action.type) {
        case 'EDIT_USER':
            return {
                ...state,
                ...action.updates
            };
        case 'SET_USER': 
            return action.user;
        default:
            return state;

    }
};
