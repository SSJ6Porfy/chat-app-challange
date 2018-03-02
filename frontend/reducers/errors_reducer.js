import { RECEIVE_MESSAGE_ERRORS, 
         RECEIVE_MESSAGE } from "../actions/message_actions";
import { RECEIVE_SESSION_ERRORS, 
         RECEIVE_USER_ERRORS, 
         RECEIVE_CURRENT_USER } from "../actions/session_actions";

const initialState = {};

const ErrorsReducer = (state = initialState, action) => {

    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_MESSAGE_ERRORS:
            return action.errors;
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_USER_ERRORS:
            return action.errors;
        case RECEIVE_MESSAGE:
            return [];
        case RECEIVE_CURRENT_USER: 
            return [];
        default:
            return state;
    }
};

export default ErrorsReducer;