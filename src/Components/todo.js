import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
import { Helmet } from "react-helmet";
import { token$ } from "./store";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",

        }

    }
    componentDidMount() {
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.get(API_ROOT + "/todos", {
            headers: {
                Authorization: "Bearer" + token$.value,
            },
        })
        .then(res =>console.log(res))
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Todo</title>
                </Helmet>

            </>
        );
    }
}

export default Home;