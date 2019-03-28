import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Register extends Component {
    render() {
        return (
            <>
                <div className="row center">
                    <h4>Register</h4>
                </div>
                <div className="container logincontainer">
                    <div className="row center">
                        <i class="material-icons accountman">face</i>
                    </div>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s8 offset-m2">
                                    <input
                                        id="email"
                                        type="email"
                                        className="validate"
                                        autoComplete="off"
                                        autoFocus="true"
                                    />
                                    <label forhtml="email">Chose Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8 offset-m2">
                                    <input id="password" type="password" className="validate" />
                                    <label for="password">Chose Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8 offset-m2">
                                    <input id="password" type="password" className="validate" />
                                    <label for="password">Verify Password</label>
                                </div>
                            </div>
                            <div className="row">
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