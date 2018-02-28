import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import SignupLoginPageContainer from "./session/login_page_container";
import Chatroom from "./chatroom/chatroom";

const App = () => (
    <Switch>
        <Route exact path="/" component={SignupLoginPageContainer}/>
        <Route path="/chatroom" component={Chatroom}/>
    </Switch>
);

export default App;