import React from 'react'
import ReactDOM from 'react-dom'
import Icon from './icon/icon'

const fn:React.MouseEventHandler = (e) => {
  console.log(e.target)
}

ReactDOM.render(
    <div>
      {/* <Icon name="wechat" className="sss" onClick={fn}/>
      <Icon name="qq" onMouseEnter={fn}/> */}
      <Icon name="alipay" onMouseEnter={fn} onMouseLeave={fn}/>  
    </div>
,
document.querySelector('#root'))