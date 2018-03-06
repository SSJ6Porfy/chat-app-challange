import React from 'react';
import io from "socket.io-client";

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.currentUser.id,
            senderId: this.props.senderId,
            recipientId: this.props.recipientId,
            chatroomId: this.props.chatroom.id,
            body: "",
        };

        this.otherMessageList = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrollBottom = this.scrollBottom.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.disableAlert = this.disableAlert.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.socket = io(window.location.host);        

        const that = this;
        this.socket.on('RECEIVE_MESSAGE', function(data){
            // that keeps context of this
            that.launchAlert(data);
        });

        this.launchAlert = this.launchAlert.bind(this);
    }

    scrollBottom() {
        // keeps message index pegged to bottom of div
        if (this.messageList) {
            this.messageList.scrollTop = this.messageList.scrollHeight;
        }
    }

    handleClick() {
        document.addEventListener('click', (e) => {
            if (!Array.prototype.slice.call(e.target.classList).includes("message-input")) {
                this.otherMessageList.lastChild.classList.add("disabled"); 
            }
        });
    }

    componentDidMount() {
        this.scrollBottom();

        // disables Send btn since forms are empty 
        this.submitBtn.disabled = true;

        // sets a "Other list" variable for O(1) lookup of other form using ref
        let currentList = this.messageList;      
        let lists = document.getElementsByClassName('message-list');
        for (let index = 0; index < lists.length; index++) {
            const list = lists[index];
            if (currentList !== list) {
                this.otherMessageList = list;
            }
        }
    }
      
    componentDidUpdate() {
        this.scrollBottom();
    }


    launchAlert(data) {
        if (data.recipientId === this.props.recipientId) {
            this.otherMessageList.lastChild.classList.remove("disabled"); 
        } else {
            this.otherMessageList.lastChild.classList.add("disabled"); 
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.body) {
            
            this.socket.emit('SENT_MESSAGE', {
                senderId: null,
                recipientId: null
            });
            
            this.props.createMessage(this.state).then(() => { 
                this.currentForm.reset();
                this.setState({ body: "" });
            });
        }
    }

    handleEnter(e) {
        // eliminating submission of empty messages
        let string = document.activeElement.value.replace(/\n|\s/g, "");
        
        if (string.length > 0 && e.keyCode === 13) {

            let newMessage = this.state;

            newMessage.chatroomId = this.props.chatroom.id;

            this.socket.emit('SENT_MESSAGE', {
                senderId: null,
                recipientId: null
            });
            
            this.props.createMessage(newMessage).then(() => { 
                this.setState({ body: "" });
                this.currentForm.reset();
                this.submitBtn.disabled = true;
            });

        } else if (string) {

            // deploys typing notifications
            // simply remove a class from typing indicator div
            // the IF statement throttles the dispatching of fetchNotification
            // by 10 seconds to prevent unnecessary calls to the backend

            this.socket.emit('SEND_MESSAGE', {
                senderId: this.props.senderId,
                recipientId: this.props.recipientId
            });

            // removes disabled constraint from SubmitBtn
            this.submitBtn.disabled = false;
        } 
    }

    disableAlert(e) {
        let string = document.activeElement.value.replace(/\n|\s/g, "");

        if ((e.keyCode === 13 || e.keyCode === 9) && string.length === 0) {
            // prevents newline character or tabbing
            e.preventDefault();
        } else if (e.keyCode === 8 && string.length === 1) {
            this.socket.emit('CLEAR_FORM', {
                senderId: null,
                recipientId: null
            });
        }
    }

    update(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }


    render() {
        this.handleClick();
        let messages = Object.values(this.props.messages);

        if (messages.length > 0) {
            // applying sent or received styling to messages
            messages = messages.map((message, idx) => {
                let messageType = message.senderId === this.props.senderId ? "message sent" : "message received";
                return (
                    <li className={messageType} key={idx+message.body}>{message.body}</li>
                );
            });
        }

        let name = this.props.recipientId === 2 ? "Rob" : "Laura";

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
                          ref={(form) => { this.currentForm = form; }}>
                        <textarea className="message-input"
                                  onKeyUp={this.handleEnter}
                                  onChange={this.update("body")}
                                  onKeyDown={this.disableAlert}
                                  placeholder="Send A Message"></textarea>
                    </form>
                    <div className="submit-btn-container">
                        <button className="submit-btn"
                                ref={(btn) => { this.submitBtn = btn; }}
                                onClick={this.handleSubmit}
                                >Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagesIndex;