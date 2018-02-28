import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import SignupLoginPageContainer from "./session/login_page_container";
import ChatroomContainer from "./chatroom/chatroom_container";
import { AuthRoute, ProtectedRoute } from '../utils/route_utils';

const App = () => (
    <div id="main">
        <div id="navbar">
        </div>
        <Switch>
            <AuthRoute exact path="/" component={SignupLoginPageContainer}/>
            <ProtectedRoute path="/chatroom" component={ChatroomContainer}/>
        </Switch>
    </div>
);

export default App;