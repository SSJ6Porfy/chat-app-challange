import { connect } from "react-redux";
import Chatroom from "./chatroom";
import { logout } from "../../actions/session_actions";
import { fetchMessages } from "../../actions/message_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMessages: (userId, senderId, recipientId) => dispatch(fetchMessages(userId, senderId, recipientId)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);