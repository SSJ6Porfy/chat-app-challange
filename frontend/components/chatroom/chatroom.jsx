import React from 'react';
import MessagesIndexContainer from '../messages/messages_index_container';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <div id="chatroom-container">
                <MessagesIndexContainer userId={2} recipientId={3}/>
                <MessagesIndexContainer userId={3} recipientId={2}/> 
            </div>
        );
    }
}

export default Chatroom;