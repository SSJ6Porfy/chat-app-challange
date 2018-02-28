import React from 'react';

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMessages(this.props.userId, this.props.recipientId);
    }

    render() {
        return (
            <div className="messages-index-container">
                <div className="messages-index">
                    I'm the Message Index
                </div>
                <div className="message-form-container">
                    <form className="message-form">
                        <input className="message-input" cols="30" rows="10"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default MessagesIndex;