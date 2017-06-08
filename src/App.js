import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog.js'
import {getCurrentUser,signOut} from './leanCloud'
import DeepCopyJSON from'./DeepCopyJSON'



class App extends Component {
  constructor(props){
    super(props)
    this.state  = {
      user: getCurrentUser() || {},
      newTodo: "",
      todoList:[]
    }
  }
  render(){
    let todos = this.state.todoList
      .filter((item)=> !item.delete)
      .map((item,index)=>{
      return ( // 为什么这里要加个括号？这是动手题3
          <li key={index}>
            <TodoItem todo={item} 
                      onToggle={this.toggle.bind(this)}
                      onDelete={this.delete.bind(this)} />
          </li>)
    })

    return (
      <div className="App">
        <header className="header">
          <h1 className="title">
              {this.state.user.username||'我'}的待办
              <button onClick={this.signOut.bind(this)}>登出</button>
          </h1>
        </header>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
                    onChange={this.changeTitle.bind(this)} 
                    onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null :   //如果注册成功就关闭 UserDialog
          <UserDialog onSignUp={this.onSignUporSignIn.bind(this)}
                      onSignIn={this.onSignUporSignIn.bind(this)}/>
        }
      </div>
    )
  }
  signOut(){
    signOut()
    let stateCopy = DeepCopyJSON(this.state)
    stateCopy.user = {}
    this.setState(stateCopy) 
  }
  onSignUporSignIn(user){
    let stateCopy = DeepCopyJSON(this.state)
    stateCopy.user = user
    this.setState(stateCopy)  
  }
  componentDidUpdate(){

  }
  delete(event,todo){
    todo.delete = true
    this.setState(this.state)
  }
  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' :'completed'
    this.setState(this.state)
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    this.state.todoList.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false
    })
    this.setState({
      newTodo:'',
      todoList:this.state.todoList
    })
  }
}

export default App;

let id = 0
function idMaker(){
  id += 1
  return id
}
