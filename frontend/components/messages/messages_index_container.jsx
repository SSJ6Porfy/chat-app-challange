import { connect } from "react-redux";
import MessagesIndex from "./message_index";
import { fetchMessages,
         createMessage } from "../../actions/message_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMessages: (userId, recipientId) => dispatch(fetchMessages(userId, recipientId)),
  createMessage: (message) => dispatch(createMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesIndex);