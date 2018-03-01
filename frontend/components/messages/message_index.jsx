import React from 'react';

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userId: this.props.currentUser.id,
            senderId: this.props.senderId,
            recipientId: this.props.recipientId,
            body: ""
        };
    }

    componentDidMount() {
        this.props.fetchMessages(this.state.userId, this.state.senderId, this.state.recipientId);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createMessage(this.state).then(() => console.log("created message"));
    }

    update(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
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
                        <textarea className="message-input" onChange={this.update('body')}></textarea>
                    </form>
                    <div className="submit-btn-container">
                        <button className="submit-btn" onClick={this.handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagesIndex;