import { SET_INIT_STORE } from '../actions/setupActions'

const setup = (state = {}, action) => {
    switch (action.type) {
        case SET_INIT_STORE:
            return { ...action.store };
        default:
            return state;
    }
};

export { setup }