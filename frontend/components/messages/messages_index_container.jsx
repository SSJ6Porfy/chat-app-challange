import { connect } from "react-redux";
import MessagesIndex from "./message_index";
import { createMessage } from "../../actions/message_actions";
import { fetchNotification } from "../../actions/chatroom_actions";
import { receiveNotification } from "../../actions/chatroom_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    currentUser: state.session.currentUser,
    chatroom: state.chatroom
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (message) => dispatch(createMessage(message)),
  fetchNotification: (chatroomId, senderId) => dispatch(fetchNotification(chatroomId, senderId)),
  clearNotification: (obj) => dispatch(receiveNotification(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesIndex);