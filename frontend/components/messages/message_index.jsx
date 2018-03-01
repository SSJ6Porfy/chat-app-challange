import React from 'react';

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMessages(this.props.currentUser.id, this.props.senderId, this.props.recipientId);
    }

    render() {
        let messages = Object.values(this.props.messages);
        if (messages.length > 0) { 
            messages = messages.map((message, idx) => {
                let messageType = message.senderId === this.props.senderId ? "message sent" : "message received";
                return (
                    <li className={messageType} key={idx+message.body}>{message.body}</li>
                );
            });
        }
        return (
            <div className="messages-index-container">
                <div className="messages-index">
                    <ul className="message-list">
                        { messages }
                    </ul>
                    <div className="typing-alert-container">
                        I'm the typing alert
                    </div>
                </div>
                <div className="message-form-container">
                    <form className="message-form">
                        <textarea className="message-input"></textarea>
                    </form>
                    <div className="submit-btn-container">
                        <button className="submit-btn">Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagesIndex;