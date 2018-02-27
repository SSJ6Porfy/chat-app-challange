import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import SignupLoginPage from "./session/login_page";
// import ChatroomContainer from "./chatroom/chatroom_container";
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={SignupLoginPage} />
      {/* <ProtectedRoute path="/chatoom" component={ChatroomContainer}/> */}
    </Switch>
  </div>
);

export default App;