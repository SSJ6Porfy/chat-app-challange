import { RECEIVE_NOTIFICATION } from "../actions/chatroom_actions";

const initialState = {};

const uiReducer = (state = initialState, action) => {

    Object.freeze(state);
    switch (action.type) {

    case RECEIVE_NOTIFICATION:
        return action.notification;
    default:
    return state;
    }
};

export default uiReducer;