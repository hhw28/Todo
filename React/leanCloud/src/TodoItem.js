import React, {Component} from 'react';
import './TodoItem.css'

export default class TodoItem extends Component{
    render(){
        return (
            <div className="TodoItem">
                <label>
                    <span  className={this.props.todo.status === 'completed' ? "iconfont icon-completed" : "iconfont icon-underway"}
                           onClick={this.toggle.bind(this)}>
                    </span>
                </label>
                <span className={this.props.todo.status === 'completed' ? "completed title" : "title"}>
                    {this.props.todo.title}
                </span> 
                <button className={this.props.todo.status === 'completed' ? "iconfont icon-delete completed1" : "iconfont icon-delete"} onClick={this.delete.bind(this)}></button>
            </div>
        )
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }
}