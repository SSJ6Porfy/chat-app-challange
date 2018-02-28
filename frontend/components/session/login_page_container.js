import { connect } from 'react-redux';
import SignupLoginPage from "./login_page";
import { logIn, signUp } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  const signedIn = state.session.currentUser || localStorage.currentUser;
  const { formType } = ownProps;
  return { signedIn, errors: state.session || [], formType };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logIn: (user) => dispatch(logIn(user)),
  signUp: (user) => dispatch(signUp(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupLoginPage);