import React, {Component} from 'react';
import './TodoItem.css'

export default class TodoItem extends Component{
    render(){
        return (
        <div className="TodoItem">
            <label className={this.props.todo.status === 'completed' ? "checked" : null}>
                <input className="check" 
                    type="checkbox" 
                    checked={this.props.todo.status === 'completed'}
                    onChange={this.toggle.bind(this)}/>
            </label>
            <span className={this.props.todo.status === 'completed' ? "checked title" : "title"}>
                {this.props.todo.title}
            </span> 
            <button className="button" onClick={this.delete.bind(this)}>X</button>
        </div>)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
}