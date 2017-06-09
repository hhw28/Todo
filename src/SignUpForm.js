import React from 'react'

export default function(props){
    return(
        <form className="signUp" onSubmit={props.onSubmit}> {/* 注册*/}
            <div className="row">
                <label>邮箱</label> 
                <input type="text" 
                       placeholder="格式xxx@xxx.xxx"
                       value={props.formData.email} 
                       onChange={props.onChange.bind(null,'email')}/>
            </div>
            <div className="row">
                <label>用户名</label> 
                <input type="text"
                       placeholder="3-10个字符" 
                       value={props.formData.username} 
                       onChange={props.onChange.bind(null,'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password"
                       placeholder="6-20字符"
                       value={props.formData.password} 
                       onChange={props.onChange.bind(null,'password')}/>
            </div>
            <div className="row actions">
                <button type="submit">注册</button>
            </div>
        </form>
    )
}