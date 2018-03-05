import { combineReducers } from 'redux';
import MessageReducer from './messages_reducer';
import SessionReducer from './session_reducer';
import ErrorsReducer from './errors_reducer';
import ChatroomReducer from './chatroom_reducer';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import chatroom from '../components/chatroom/chatroom';


const appReducer = combineReducers({
  session: SessionReducer,
  messages: MessageReducer,
  chatroom: ChatroomReducer,
  errors: ErrorsReducer
});

// destroys store if current user null
const RootReducer = (state, action) => {
  if (action.type === RECEIVE_CURRENT_USER && (!action.currentUser)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default RootReducer;