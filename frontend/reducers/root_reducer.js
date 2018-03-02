import { combineReducers } from 'redux';
import MessageReducer from './messages_reducer';
import SessionReducer from './session_reducer';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';


const appReducer = combineReducers({
  session: SessionReducer,
  messages: MessageReducer,
});


const RootReducer = (state, action) => {
  if (action.type === RECEIVE_CURRENT_USER && (!action.currentUser)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default RootReducer;