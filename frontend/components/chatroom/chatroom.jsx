import React from 'react';
import { Redirect } from 'react-router-dom';
import MessagesIndexContainer from '../messages/messages_index_container';
import Navbar from '../navbar/navbar';
import receiveNotification from '../../actions/chatroom_actions';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        let recipientId = this.props.chatroomActive.recipientId;
        let status;
        if (recipientId) {
            if (recipientId === 2) {
                status = 3;
            } else {
                status = 2;
            }
        }
        // for purposes of coding challenge, 
        // senderId and recipientId are coded to User Laura and User Rob
        return (
            <div id="main">
                <Navbar currentUser={this.props.currentUser} handleLogout={this.props.logout}/>
                <div id="chatroom-container">
                    <MessagesIndexContainer activeId={status}
                                            chat={this.props.chatroom}
                                            senderId={3} 
                                            recipientId={2}/>

                    <MessagesIndexContainer activeId={status}
                                            senderId={2} 
                                            recipientId={3}/> 
                </div>
            </div>
            
        );
    }
}

export default Chatroom;