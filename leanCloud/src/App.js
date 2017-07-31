import React, { Component } from 'react';
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'
import DeepCopyJSON from'./DeepCopyJSON'
import $ from 'jquery'
import './iconfont/iconfont.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state  = {
      user: getCurrentUser() || {},
      newTodo: "",
      todoList:[]
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = DeepCopyJSON(this.state)
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }
  render(){
    let todos = this.state.todoList.filter((item)=>!item.deleted).map((item,index)=>{

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
          <div className="addinput" onClick={this.showInput.bind(this)}>+</div>
          {this.state.user.id ? null :   //如果注册成功就关闭 UserDialog
            <UserDialog onSignUp={this.onSignUporSignIn.bind(this)}
                        onSignIn={this.onSignUporSignIn.bind(this)}/>
          }
        </div>
      )
  }
  showInput(){
    $('.inputWrapper').show()
  }
  signOut(){
    signOut()
    let stateCopy = DeepCopyJSON(this.state)
    stateCopy.user = {}
//解决退出登录TodoItem不更新
    stateCopy.todoList = []
    stateCopy.newTodo = ''

    this.setState(stateCopy) 
  }
  onSignUporSignIn(user){
    let stateCopy = DeepCopyJSON(this.state)
    stateCopy.user = user
    this.setState(stateCopy)
//解决退出登录TodoItem不更新
    let users = getCurrentUser()
    if (users) {
      TodoModel.getByUser(users, (todos) => {
        let stateCopy = DeepCopyJSON(this.state)
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }
  componentDidUpdate(){

  }
  toggle(e, todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
  
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    let newTodo = {
        title: event.target.value,
        status: '',
        deleted: false
    }
    TodoModel.create(newTodo,(id) => {
        newTodo.id = id
        this.state.todoList.push(newTodo)
        this.setState({
            newTodoL:'',
            todoList:this.state.todoList
        })
      },(error)=>{
          console.log(error)
      })
  }

  delete(event,todo){
    TodoModel.destroy(todo.id,() => {
      todo.deleted= true
      this.setState(this.state)
    })
  }
}

export default App
