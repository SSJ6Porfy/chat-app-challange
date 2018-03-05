import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, signIn }) => (
   <Route path={path} render={(props) => (
    !signIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/chatroom" />
    )
  )} />
);

const Protected = ({ component: Component, path, signIn }) => (
  <Route path={path} render={(props) => (
     signIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = state => (
  { signIn: Boolean(state.session.currentUser) }
);

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));