import React from 'react'
import './TodoInput.css'

function submit(props,e){
    if(e.key==='Enter'){
        if(e.target.value.trim()!==''){  //判断用户是否输入文字，若为空则拒绝
            props.onSubmit(e)
        }else{
            alert('请输入文字')
        }
    }
}
function changeTitle(props,e){
    props.onChange(e)
}

export default function(props){
    return <input type="text" className="TodoInput"
                  value={props.content} 
                  onChange={changeTitle.bind(null,props)}
                  onKeyPress={submit.bind(null,props)}/>
}
