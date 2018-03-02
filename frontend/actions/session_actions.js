import * as SessionAPIUtil from "../utils/session_utils";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const LOGOUT = "LOGOUT";

export const logIn = (user) => dispatch => (
  SessionAPIUtil.login(user)
    .then(res => (dispatch(receiveCurrentUser(res.data))
    ), err => (
    dispatch(receiveSessionErrors(err.response.data.errors))
  ))
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout()
  .then(res => (dispatch(receiveCurrentUser(null))
  ))
);

export const signUp = (user) => dispatch => (
  SessionAPIUtil.signup(user)
    .then(res => (dispatch(receiveCurrentUser(res.data))
    ), err => (
      dispatch(receiveSessionErrors(err.response.data.errors))
    ))
);

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});


export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const logoutClear = () => ({
  type: LOGOUT
});