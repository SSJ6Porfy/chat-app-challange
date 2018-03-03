import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../navbar/navbar';

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
    console.log(this.props, "inside signup");
    this.props.signUp(this.state).then(() => this.props.history.push('/chatroom'));
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

  handleLogout(e) {
    e.preventDefault();
    this.setState({username: "", email: "", password: ""});
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
        let err = error.message ? "Username/Passowrd can not be empty" : error;
        return ( <li key={`error-${i}`}>
                  {err}
                </li>);
        });
      return errors;
    }
  }


  render() {
    const form = this.props.currentUser ?
      <div className="splash-logged-in">
        <h2>You're logged in. Sign Out!</h2>
        <Link to={"/chatroom"}>Go to Chatroom</Link>
      </div> :
        <div>
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