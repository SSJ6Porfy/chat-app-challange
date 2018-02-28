import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SignupLoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleDemoLogIn = this.handleDemoLogIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = { username: "", password: ""};
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    if (this.props.currentUser) {
      this.props.history.push('/chatroom');
    }
  }


  handleSignUp(e) {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  handleLogIn(e) {
    e.preventDefault();
    this.props.logIn({username: this.state.username,
                      password: this.state.password})
                      .then(() => this.props.history.push('/chatroom')); 
    this.setState({username: "", password: ""}); 
  }

  handleDemoLogIn(e) {
    e.preventDefault();
    this.props.logIn({username: "demo",
                      password: "1234567890"});
    this.setState({username: "", password: ""});
  }

  handleSignOut(e) {
    e.preventDefault();
    this.setState({username: "", email: "", password: ""});
    this.props.logOut();
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    const form = this.props.currentUser ?
      <div className="splash-logged-in">
        <button onClick={this.handleSignOut}>You're logged in. Sign Out!</button>
        <Link to={"/chatroom"}>Go to Chatroom</Link>
      </div> :
        <div>
          <form onSubmit={this.handleSignUp}>
              <input type="text"
                     onChange={this.update('username')}
                     placeholder="Username"
                     value={this.state.username}></input>

              <ul>
                 {/* {
                   this.props.errors.map((err) => <li className="errors" key={err}>{err}</li>)
                 } */}
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
        <div className="splash-content">
          <div className="splash-greeting">
            <h2>Keep in touch with friends and family on</h2>
            <br/>
            <h1>Asapp Chat</h1>
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