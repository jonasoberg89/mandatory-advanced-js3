import React, { Component } from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";
import { token$ } from "./store";
import TodoForm from "./todoform"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            content:"",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    componentDidMount() {
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.get(API_ROOT + "/todos", {
            headers: {
                Authorization: "Bearer " + token$.value,
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

    onSubmit(e){
        e.preventDefault()
        let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        axios.post(API_ROOT + "/todos", { content:this.state.content },{
            headers: {
                Authorization: "Bearer " + token$.value,
            },
        }).then(res =>console.log(res))   
    }
     
    onChange(e){
        this.setState({
            content:e.target.value
        })
    }

    deleteTodo(id) {
        console.log(id);
        // const todos = this.state.data.filter(todo => {
        //     return todo.id !== id
        // })
        // this.setState({
        //     data: todos
        // })
    }

    render() {
        let todos = this.state.data;
        const todoList = todos.length ? (
            todos.map(todo => {
                return (
                    <div className="collection-item" key={todo.id}>
                        <span onClick={()=>{this.deleteTodo(todo.id)}}>{todo.content}</span>
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
                <div className="container">
                    <div className="todos collection">
                        {todoList}
                    </div>
                    <TodoForm 
                        handleSubmit={this.onSubmit} 
                        handleOnChange={this.onChange}
                        content ={this.state.content}
                    />
                </div>


            </>
        );
    }
}

export default Home;