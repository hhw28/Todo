import React from 'react';

export default function(props){
    return(
        <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
            <div className="block"></div>
            <div className="row">
                {/*<label>用户名</label>*/}
                <input type="text" 
                        placeholder="用户名"
                        value={props.formData.username} 
                        onChange={props.onChange.bind(null,'username')}/>
            </div>
            <div className="row">
                <input type="password"
                        placeholder="密码"
                        value={props.formData.password} 
                        onChange={props.onChange.bind(null,'password')}/>
            </div>
            <div className="actions">
                <a href="#" onClick={props.onForgotPassword}>
                    <span>?</span>
                    忘记密码
                </a>
                <button type="submit">登录</button>
            </div>

        </form>
    )
}