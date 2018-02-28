import { combineReducers } from 'redux';
import MessageReducer from './messages_reducer';
import SessionReducer from './session_reducer';
// import FriendsReducer from './friends_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  messages: MessageReducer,
//   friends: FriendsReducer
});

export default RootReducer;