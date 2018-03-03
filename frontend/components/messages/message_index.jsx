import React from 'react';

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.currentUser.id,
            senderId: this.props.senderId,
            recipientId: this.props.recipientId,
            body: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrollBottom = this.scrollBottom.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.disableAlert = this.disableAlert.bind(this);
    }

    scrollBottom() {
        if (this.messageList) {
            this.messageList.scrollTop = this.messageList.scrollHeight;
        }
    }

    componentDidMount() {
        this.scrollBottom();
    }
      
    componentDidUpdate() {
        this.scrollBottom();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createMessage(this.state).then(() => { 
            this.CurrentForm.reset();
        });
    }

    handleEnter(e) {
        // eliminating submission of empty messages
        let string = document.activeElement.value.replace(/\n|\s/g, "");


        if (string.length > 0 && e.keyCode === 13) {
            this.props.createMessage(this.state).then(() => { 
                this.setState({ body: "" });
                this.CurrentForm.reset();
            });
        } else if (string.length === 0 ) {
            // if user hits enter but input is empty
            document.activeElement.value = "";
            this.setState({ body: "" });
        } else {
            // deploys typing notifications
            // simply remove a class from typing indicator div

            // In reality this function should dispatch a throttled action to the backend
            // server where it will route a notification to the other user
            let currentList = this.messageList;
            let lists = document.getElementsByClassName('message-list');
            for (let index = 0; index < lists.length; index++) {
                const list = lists[index];
                if (currentList !== list) {
                    list.lastChild.classList.remove("disabled");
                }
            }
        }
    }

    disableAlert(e) {
        let lists = document.getElementsByClassName('message-list');
            for (let index = 0; index < lists.length; index++) {
                const list = lists[index];
                list.lastChild.classList.add("disabled");
            }
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
        let name = this.props.senderId === 3 ? "Rob" : "Laura";
        return (
            <div className="messages-index-container">
                <div className="sender-name-container">
                    <h2 className="sender-name">{ name }</h2>
                </div>
                <div className="messages-index">
                    <ul className="message-list" ref={(list) => { this.messageList = list; }}>
                        { messages }
                        <li className="typing-alert-container disabled" >
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="message-form-container">
                    <form className="message-form" 
                          ref={(form) => { this.CurrentForm = form; }}>
                        <textarea className="message-input" 
                                  name="body"
                                  onKeyDown={this.handleEnter}
                                  onKeyUp={this.disableAlert}
                                  onChange={this.update('body')}
                                  placeholder="Send A Message"></textarea>
                    </form>
                    <div className="submit-btn-container">
                        <button className="submit-btn"
                                onClick={this.handleSubmit}
                                >Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagesIndex;