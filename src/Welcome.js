import React from 'react'; // 为什么要 import React

//第一种写法
class Welcome extends React.Component {
  constructor(props){
      super(props)
      // 上面照抄，不懂的话看 MDN 
      this.state = {
        date: new Date(),
        test:'1'
      }
     setInterval(()=>{ // 搜索「JS 箭头函数 MDN」
      this.setState({
         date: new Date() // 更新 date
      })
     })
     console.log('mount 1.constructor(),我已经在 constructor 里将 props 和 state 初始化好了')
  }
  componentWillMount(){
      this.setState({
        date: new Date(), // 更新 date
        test: 'componentWillMount'
      })
    console.log('mount 2.componentWillMount,运行到这里的话，说明马上就要运行 render 了')
  }
  render(){
    console.log('mount 3.render(),嗯，这里是 render')
    return (
       <div>
         <h1>Hello, {this.props.name}</h1>
         <h2>{this.state.date.toString()}</h2>

       </div>
     )
  }
  componentDidMount(){
      this.setState({
        date: new Date(), // 更新 date
        test: 'componentDidMount'
      })   
    console.log('mount 4.componentDidMount,已经挂载到页面里了')
  }
  componentWillReceiveProps(nextProps){
      this.setState({
        date: new Date(), // 更新 date
        test: 'componentWillReceiveProps'
      }) 
      console.log('update 1.我要读取 props 啦！')
  }
  shouldComponentUpdate(nextProps, nextState){

      console.log('update 2.请问要不要更新组件？true / false')
      return true
  }
  componentWillUpdate(){
      console.log('update 3.我要更新组件啦！')
  }  
  componentDidUpdate(){
      console.log('update 5.更新完毕啦！')
  }
  componentWillUnmount(){
    console.log('要死了')
  }  
}

/*第二种写法，目前比较流行
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}*/

export default Welcome // 为什么要 export，为什么要加 default