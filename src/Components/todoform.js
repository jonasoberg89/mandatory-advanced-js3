import React, { Component } from 'react';

class AddTodo extends Component {
    render() {
        return (    
            <div className="row todoform">
                <form className="col s9 formtodo" onSubmit={this.props.handleSubmit}>
                    <div className="input-field col s6 offset-m5">
                        <input 
                            onChange={this.props.handleOnChange}
                            value = {this.props.content}
                            autoFocus={true}
                            type="text" 
                            className="validate" />
                        <label>add todo</label>
                    </div>
                </form>
            </div>
        )
    }

}

export default AddTodo