import React from 'react'
import './TodoInput.css'
import $ from 'jquery'

function submit(props,e){
    if(e.key==='Enter'){
        if(e.target.value.trim()!==''){  //判断用户是否输入文字，若为空则拒绝
            props.onSubmit(e)
            $('.inputWrapper').hide()  //用户按了回车后隐藏输入框
            $('.footer').animate({left:'39.5em'})
        }else{
            alert('请输入文字')
        }
    }
}
function changeTitle(props,e){
    props.onChange(e)
}

export default function(props){
    return (
        <input type="text" 
               className="TodoInput"
               placeholder="请输入您的待办，按回车键添加"
               value={props.content} 
               onChange={changeTitle.bind(null,props)}
               onKeyPress={submit.bind(null,props)}/>
    )
}
