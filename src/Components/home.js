import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
import { Helmet } from "react-helmet";
import {updateToken} from "./store";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error:"",
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    this.source = axios.CancelToken.source();
    let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
    axios.post(API_ROOT + "/auth", { email: this.state.username, password: this.state.password },{
      headers:{cancelToken: this.source.token}
    })
      .then(res =>{
        updateToken(res.data.token);
        window.localStorage.setItem("token", res.data.token)
        this.props.history.push("/todo");
      })
      .catch(err =>{
        this.setState({
          error:"Invalid username or password"
        })
        console.log ("vafan");
      })
  }
  componentWillUnmount(){
    if(this.source){
      this.source.cancel();
      console.log("home unmount")
    }
  }
  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="row center">
          <h4>Log In</h4>
        </div>
        <div className="container logincontainer">
          <div className="row center">
            <i className="material-icons accountman">account_circle</i>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={this.handleLogin}>
              <div className="row">
                <div className="input-field col s8 offset-m2">
                  <input
                    onChange={this.handleUsername}
                    value={this.state.username}
                    id="email"
                    type="email"
                    className="validate"
                    autoFocus={true}
                  />
                  <label forhtml="email">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s8 offset-m2">
                  <input
                    onChange={this.handlePassword}
                    value={this.state.password}
                    id="password"
                    type="password"
                    className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row center">
              <span>{this.state.error}</span>
                <div className="input-field col s12">
                  <button className="btn waves-effect light-blue darken-4" type="submit" name="action">Login
                  </button>
                </div>
              </div>
              <Link to="/register" className="input-register">Register</Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Home;