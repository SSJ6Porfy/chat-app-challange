import { RECEIVE_CHATROOM } from "../actions/chatroom_actions";

const initialState = {};

const ChatroomReducer = (state = initialState, action) => {

    Object.freeze(state);
    switch (action.type) {

    case RECEIVE_CHATROOM:
        return action.chatroom;
    default:
    return state;
    }
};

export default ChatroomReducer;