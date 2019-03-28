import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:"",
      password:"",
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e){
    e.preventDefault();
    let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
    axios.post(API_ROOT + "/auth", { email:this.state.username, password:this.state.password })
    .then(res => console.log (res))
  }
  handleUsername(e){
    this.setState({
      username:e.target.value
    })
  }
  handlePassword(e){
    this.setState({
      password:e.target.value
    })
  }


  render() {
    return (
      <>
        <div className="row center">
          <h4>Log In</h4>
        </div>
        <div className="container logincontainer">
          <div className="row center">
            <i className="material-icons accountman">account_circle</i>
          </div>
          <div className="row">
            <form className="col s12" onSubmit = {this.handleLogin}>
              <div className="row">
                <div className="input-field col s8 offset-m2">
                  <input
                    onChange={this.handleUsername}
                    value = {this.state.username}
                    id="email"
                    type="email"
                    className="validate"
                    autoComplete="off"
                    autoFocus={true}
                  />
                  <label forhtml="email">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8 offset-m2">
                  <input 
                  onChange={this.handlePassword}
                  value = {this.state.password}
                  id="password" 
                  type="password" 
                  className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s4 offset-m4">
                  <button className="btn waves-effect light-blue darken-4" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
              <Link to="/Register" className="input-register">Register</Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Home;