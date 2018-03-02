import React from 'react';
import { Redirect } from 'react-router-dom';
import MessagesIndexContainer from '../messages/messages_index_container';
import Navbar from '../navbar/navbar';

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
        // Fetch messages for the current user and the 
        // messages between Rob and Laura
        if (this.props.currentUser) {
            this.props.fetchMessages(this.props.currentUser.id, 2, 3);
        }
    }

    render() {
        
        return (
            <div id="main">
                <Navbar currentUser={this.props.currentUser} handleLogout={this.props.logout}/>
                <div id="chatroom-container">
                    <MessagesIndexContainer chatroomId={1} senderId={2} recipientId={3}/>
                    <MessagesIndexContainer chatroomId={2} senderId={3} recipientId={2}/> 
                </div>
            </div>
            
        );
    }
}

export default Chatroom;