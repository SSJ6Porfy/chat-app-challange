import { connect } from 'react-redux';
import SignupLoginPage from "./login_page";
import { logIn, signUp, logout } from "../../actions/session_actions";
import { fetchChatroom, createChatroom } from "../../actions/chatroom_actions";
import { fetchMessages } from "../../actions/message_actions";

const mapStateToProps = (state, ownProps) => {
  let currentUser = state.session.currentUser || localStorage.currentUser;
  return { currentUser: currentUser, errors: state.errors };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logIn: (user) => dispatch(logIn(user)),
  signUp: (user) => dispatch(signUp(user)),
  logout: () => dispatch(logout()),
  fetchChatroom: (userId) => dispatch(fetchChatroom(userId)),
  createChatroom: (chatroom) => dispatch(createChatroom(chatroom)),
  fetchMessages: (userId) => dispatch(fetchMessages(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupLoginPage);