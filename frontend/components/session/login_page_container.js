import { connect } from 'react-redux';
import SignupLoginPage from "./login_page";
import { logIn, signUp, logout } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  let currentUser = state.session.currentUser || localStorage.currentUser;
  return { currentUser: currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logIn: (user) => dispatch(logIn(user)),
  signUp: (user) => dispatch(signUp(user)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupLoginPage);