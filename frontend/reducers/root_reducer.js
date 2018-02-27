import { combineReducers } from 'redux';
// import MessagesReducer from 'messages_reducer';
import SessionReducer from './session_reducer';
// import FriendsReducer from './friends_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
//   messages: MessagesReducer,
//   friends: FriendsReducer
});

export default RootReducer;