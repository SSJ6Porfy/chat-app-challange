import { connect } from 'react-redux';
import SignupLoginPage from "./session_login_form";
import { login, signup } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  const signedIn = !!state.session.currentUser;
  const { formType } = ownProps;
  return { signedIn, errors: state.errors.session || [], formType };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (user) => dispatch(login(user)),
  signup: (user) => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupLoginPage);