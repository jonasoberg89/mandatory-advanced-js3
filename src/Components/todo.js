import React, { Component } from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";
import { token$ } from "./store";
import { updateToken } from "./store";
import TodoForm from "./todoform"
import jwt from "jsonwebtoken";

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            content: "",
            username:"",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.getData = this.getData.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    componentDidMount() {
        this.getData();
        const decoded = jwt.decode(token$.value);
        console.log (decoded.email);
        this.setState({
            username:decoded.email
        })
    }

    getData() {
        this.source = axios.CancelToken.source();
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.get(API_ROOT + "/todos", {
            headers: {
                Authorization: "Bearer " + token$.value,
                cancelToken: this.source.token
            },
        }).then(res => {
            console.log(res);
            this.setState({
                data: res.data.todos,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    onSubmit(e) {
        e.preventDefault()
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.post(API_ROOT + "/todos", { content: this.state.content }, {
            headers: {
                Authorization: "Bearer " + token$.value,
                cancelToken: this.source.token
            },
        }).then(res => {
            console.log(res)
            this.getData()
            this.setState({
                content: "",
            })
        })
    }
    onChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    deleteTodo(id) {
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.delete(API_ROOT + "/todos/" + id, {
            headers: {
                Authorization: "Bearer " + token$.value,
                cancelToken: this.source.token
            },
        }).then(res => {
            console.log(res)
            this.getData()
        }).catch(err => {
            console.log(err);
            this.getData();
        })
    }
    handleLogOut(e) {
        e.preventDefault();
        updateToken(null);
        this.props.history.push("/");
    }
    componentWillUnmount() {
        this.source.cancel();
        console.log("todo unmount")
    }
    render() {
        let todos = this.state.data;
        const todoList = todos.length ? (
            todos.map(todo => {
                return (
                    <div className="collection-item" key={todo.id}>
                        <span className="todo-text" >{todo.content}</span>
                        <div className="right" >
                            <i onClick={() => { this.deleteTodo(todo.id) }} className="material-icons deleteTodo">remove_circle</i>
                        </div>

                    </div>
                )
            })
        ) : (
                <p className="center">You have no todo's left =) </p>
            )
        return (
            <>
                <Helmet>
                    <title>Todo</title>
                </Helmet>
                <div className="todocontainer row">
                    <div className="todos collection col s6">
                        {todoList}
                    </div>
                    <div className="sidebar center col s6 " >
                            <span className="nameLog">{this.state.username}</span>
                            <button
                                onClick={this.handleLogOut}
                                className="btn waves-effect light-blue darken-4 todo-button"
                                name="action">Log out
                            </button>
                   
                    </div>
                    <TodoForm
                        handleSubmit={this.onSubmit}
                        handleOnChange={this.onChange}
                        content={this.state.content}
                    />
                </div>
            </>
        );
    }
}

export default Todo;