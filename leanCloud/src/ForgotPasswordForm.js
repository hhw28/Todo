import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component{
    render(){
        return(
            <div className="forgotPassword">
                <h4>重置密码</h4>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
                    <div className="row">
                        <input type="text" 
                               placeholder="请输入邮箱"
                               value={this.props.formData.email}
                               onChange={this.props.onChange.bind(null,'email')}/>
                    </div>
                    <div className="actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.props.onSignIn}>返回登录</a>
                    </div>
                </form>
            </div>  
        )
    }
}