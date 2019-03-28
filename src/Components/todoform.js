import React, { Component } from 'react';

class AddTodo extends Component {
    render() {
        return (    
            <div className="row">
                <form className="col s12" onSubmit={this.props.handleSubmit}>
                    <div className="input-field col s6 offset-m3">
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