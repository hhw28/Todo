import React from 'react'

export default function(props){
    return(
        <form className="signUp" onSubmit={props.onSubmit}> {/* 注册*/}
            <div className="block"></div>
            <div className="row">
                <input type="text" 
                       placeholder="邮箱xx@xx.xxx"
                       value={props.formData.email} 
                       onChange={props.onChange.bind(null,'email')}/>
            </div>
            <div className="row"> 
                <input type="text"
                       placeholder="用户名3-6个字符" 
                       value={props.formData.username} 
                       onChange={props.onChange.bind(null,'username')}/>
            </div>
            <div className="row">
                <input type="password"
                       placeholder="密码6-20字符"
                       value={props.formData.password} 
                       onChange={props.onChange.bind(null,'password')}/>
            </div>
            <div className="actions">
                <button type="submit">注册</button>
            </div>
        </form>
    )
}