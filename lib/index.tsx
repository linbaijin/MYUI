import React from 'react'
import ReactDOM from 'react-dom'
import Icon from './icon/icon'

const fn:React.MouseEventHandler = () => {
  console.log(1)
}

ReactDOM.render(
    <div>
      <Icon name="wechat"/>
      <Icon name="qq"/>
      <Icon name="alipay" onClick={fn}/>  
    </div>
,
document.querySelector('#root'))