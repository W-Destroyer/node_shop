import { USER } from '../actions/user';

const initialState = {

}

export default function getUser(state = initialState, action) {
    switch(action.type) {
        case USER:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}