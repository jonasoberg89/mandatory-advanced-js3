import React, { Component } from 'react';
import jwt from "jsonwebtoken";
import { token$ } from "./store";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
    }

    componentDidMount() {
        this.subscription = token$.subscribe((token) => {
            if (token) {
                const decoded = jwt.decode(token);
                this.setState({ username: decoded.email });
            } else {
                this.setState({ username: "" });
            }
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <nav className="nav-wrapper light-blue darken-4">
                <div className="container">
                    <span className="brand-logo center">Todo App</span>
                    <span className="right namelog">{this.state.username}</span>

                </div>
            </nav>
        )

    }

}

export default Navbar