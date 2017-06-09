import React, { Component } from 'react';
import './UserDialog.css'
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

import DeepCopyJSON from './DeepCopyJSON'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab:'signInOrSignUp', // 'forgotPassword'
            formData:{
                email:'',
                username:'',
                password:'',
            }
        }
    }
    signUp(e){
        e.preventDefault()
        let {email,username,password} = this.state.formData

        let isLeagal = this.checkFormData.call(this,email,username,password) //先验证，再向服务器提交
        if(isLeagal===false){
            return
        }

        let success = (user)=>{
            this.props.onSignUp.call(null,user)
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
		            alert('用户名已被占用')
                    break
                case 217:
		            alert('用户名不能含有空格')
                    break
                case 125:
		            alert('电子邮箱格式为xxx@xxx.xxx')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(email,username,password,success,error)
    }
    checkFormData(email,username,password){
        let regEmail = new RegExp('^\\w+@[\\w.]+$')
        let regUsername = new RegExp('^\\w{3,10}')
        let regPassword = new RegExp('^\\w{6,20}')

        if(!regEmail.test(email)){
            alert('电子邮箱格式为xxx@xxx.xxx')
            return false
        }
        if(!regUsername.test(username)){
 			alert('请输入用户名，长度为3-10个字符')
 			return false
 		}
        if(!regPassword.test(password)){
 			alert('请输入密码，长度为6-20个字符')
 			return false
 		}
 		return true
    }
    signIn(e){
        e.preventDefault()
        let {username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error = (error)=>{
            switch(error.code){
                case 210:
		            alert('用户名与密码不匹配')
                    break
                case 211:
		            alert('找不到用户')
                    break
                case 403:
		            alert('无权限操作')
                    break
                default:
                    alert(error)
                    break
            }    
        }
        signIn(username,password,success,error)
    }
    changeFormData(key,e){
        let stateCopy = DeepCopyJSON(this.state)
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render(){
        return(
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? 
                        <SignInOrSignUp formData={this.state.formData}
                                        onSignIn={this.signIn.bind(this)}
                                        onSignUp={this.signUp.bind(this)}
                                        onChange={this.changeFormData.bind(this)}
                                        onForgotPassword={this.showForgotPassword.bind(this)}
                        /> : 
                        <ForgotPasswordForm formData={this.state.formData}
                                            onSubmit={this.resetPassword.bind(this)}
                                            onChange={this.changeFormData.bind(this)}
                                            onSignIn={this.returnTosignIn.bind(this)}
                        />
                    }
                </div>
            </div>
        )
    }
    showForgotPassword(){
        let stateCopy = DeepCopyJSON(this.state)
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
    returnTosignIn(){
        let stateCopy = DeepCopyJSON(this.state)
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy) 
    }
}


