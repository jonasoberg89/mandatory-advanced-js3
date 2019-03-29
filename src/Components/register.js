import React, { Component } from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            verifypass: "",
            error: "",
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.verifypass) return;
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.post(API_ROOT + "/register", { email: this.state.username, password: this.state.password })
            .then(res => {
                this.setState({
                    error: "",
                })
                console.log(res);
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({
                    error: "Invalid username or password..."
                })
                console.log(err);
            })
        // Sedan ska man pushas till todopage.
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
    handleVerify(e) {
        this.setState({
            verifypass: e.target.value
        })
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Register</title>
                </Helmet>
                <div className="row center">
                    <h4>Register</h4>
                </div>
                <div className="container logincontainer">
                    <div className="row center">
                        <i className="material-icons accountman">face</i>
                    </div>
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s8 offset-m2">
                                    <input
                                        value={this.state.username}
                                        onChange={this.handleUsername}
                                        id="email"
                                        type="email"
                                        className="validate"
                                        autoComplete="off"
                                        autoFocus={true}
                                    />
                                    <label htmlFor="email">Chose Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8 offset-m2">
                                    <input
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                        id="password"
                                        type="password"
                                        className="validate"
                                    />
                                    <label htmlFor="password">Chose Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8 offset-m2">
                                    <input
                                        value={this.state.verifypass}
                                        onChange={this.handleVerify}
                                        id="passwordConfirm"
                                        type="password"
                                        className="validate"
                                    />
                                    <label
                                        id="lblPasswordConfirm"
                                        htmlFor="passwordConfirm"
                                        data-error="Password not match">
                                        Repeat Password
                                    </label>
                                </div>
                            </div>
                            <div className="row center">
                                <span>{this.state.error}</span>
                                <div className="input-field col s4 offset-m4">
                                    <button className="btn waves-effect light-blue darken-4" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Register;