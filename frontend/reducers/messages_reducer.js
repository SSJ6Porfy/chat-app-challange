import { merge } from "lodash";
import { RECEIVE_MESSAGES,
         RECEIVE_MESSAGE } from "../actions/message_actions";

const initialState = {};

const MessageReducer = (state = initialState, action) => {

  Object.freeze(state);
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_MESSAGES:
        const blankState = {};
        action.messages.forEach((message) => {
            blankState[message.id] = message;
        });
        return blankState;
    case RECEIVE_MESSAGE:
        newState[action.message.id] = action.message;
        return newState;
    default:
        return state;
  }
};

export default MessageReducer;