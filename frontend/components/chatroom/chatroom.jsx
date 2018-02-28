import React from 'react';
import MessagesIndexContainer from '../messages/messages_index_container';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout().then(() => this.props.history.push('/'));
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({ username: this.props.currentUser.username});
        }
    }

    render() {
        let logoutBtn = this.props.currentUser ? <button onClick={this.handleLogout}>Logout</button> : <h1>""</h1>;
        return (
            <div id="main">
                <div id="navbar-container">
                    { logoutBtn }
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