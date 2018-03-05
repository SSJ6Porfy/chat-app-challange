import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

class SignupLoginPage extends Component {
  constructor(props) {
    super(props);
    
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleDemoLogIn = this.handleDemoLogIn.bind(this);
    this.handlelogout = this.handleLogout.bind(this);
    this.state = { username: "", password: ""};
  }

  handleSignUp(e) {
    e.preventDefault();

    // for purpose of coding challenge
    // Laura and Rob are Default User IDs 2 and 3

    let newChatroom = {
      userId: null,
      participantOneId: 2,
      participantTwoId: 3,
    };

    this.props.signUp(this.state)
      .then((user) => {
        newChatroom.userId = user.currentUser.id;
        this.props.createChatroom(newChatroom);
      });
  }

  handleLogIn(e) {
    e.preventDefault();
    this.props.logIn({ 
                      username: this.state.username,
                      password: this.state.password
                    })
                    .then((user) => { 
                      this.props.fetchChatroom(user.currentUser.id)
                      .then(() => this.props.fetchMessages(user.currentUser.id));
                    }).catch((err) => {});
    
    this.setState({username: "", password: ""}); 
  }

  handleDemoLogIn(e) {
    e.preventDefault();

    this.props.logIn({ 
                      username: "demo",
                      password: "1234567890"
                    })
                    .then((user) => { 
                      this.props.fetchChatroom(user.currentUser.id)
                      .then(() => this.props.fetchMessages(user.currentUser.id));
                    }).catch((err) => {});

    this.setState({username: "", password: ""}); 
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({ username: "", password: "" });
    this.props.logout().then(() => <Redirect to="/"/>);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }


  renderErrors() {
    let errors = Object.values(this.props.errors);
    if (errors.length > 0) {
      errors = errors.map((error, i) => {
        let err = error.message ? "Username/Password can not be empty" : error;
        return ( <li key={`error-${i}`}>
                  {err}
                </li>);
        });
      return errors;
    }
  }


  render() {
    const form = <div id="session-form-container">
                  <form onSubmit={this.handleSignUp}>
                      <input type="text"
                            onChange={this.update('username')}
                            placeholder="Username"
                            value={this.state.username}></input>

                      <ul>
                          <h2 className="errors-text">{this.renderErrors()}</h2>
                      </ul>

                      <input type="password"
                            onChange={this.update('password')}
                            placeholder="Password"
                            value={this.state.password}></input>

                      <div className="login-btn-container">
                        <button id="login-btn" onClick={this.handleLogIn}>
                          Login
                        </button>
                        <button id="demo-btn" onClick={this.handleDemoLogIn}>
                          Demo
                        </button>
                        <button id="signup-btn" onClick={this.handleSignUp}>
                            Signup
                        </button>
                      </div>
                  </form>
                </div>;


    return (
      <div className="splash">
      <Navbar currentUser={this.props.currentUser} handleLogout={this.props.logout} />
        <div className="splash-content">
          <div className="splash-greeting">
            <img id="image-big" src="http://res.cloudinary.com/ssj6porfy/image/upload/v1519973709/AsappChat3_gmszcb.png"/>
            <h1 id="app-tag">Keep in touch with friends and family on</h1>
            <br/>
            <h1 id="app-name">Asapp Chat</h1>
          </div>

          <div className="splash-form">
            {form}
          </div>
        </div>
      </div>
    );
  }
}

export default SignupLoginPage;