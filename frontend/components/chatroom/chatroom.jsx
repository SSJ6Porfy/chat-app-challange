import React from 'react';
import { Redirect } from 'react-router-dom';
import MessagesIndexContainer from '../messages/messages_index_container';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser;
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => <Redirect to="/"/>);
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.fetchMessages(this.props.currentUser.id, 2, 3);
        }
    }

    render() {
        let logoutBtn = this.props.currentUser ? <button id="logout-btn" onClick={this.handleLogout}>Logout</button> : null;
        return (
            <div id="main">
                <div id="navbar-container">
                    <div id="logo-container">
                        <h2 id="logo">Asapp Chat</h2>
                    </div>
                    <div id="navbar-btn-container">
                        { logoutBtn }
                    </div>
                </div>
                <div id="chatroom-container">
                    <MessagesIndexContainer senderId={2} recipientId={3}/>
                    <MessagesIndexContainer senderId={3} recipientId={2}/> 
                </div>
            </div>
            
        );
    }
}

export default Chatroom;