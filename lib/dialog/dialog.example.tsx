import React, {useState} from 'react'
import Dialog,{alert,confirm,modal} from './dialog'

export default function () {
    const [x,setX] = useState(false)
    const [y,setY] = useState(false)
    const openModal = () => {
       const close = modal(<h1>hello<button onClick={()=>close()}>button</button></h1>)
    }
    return (
        <div>
            <h1>example1</h1>
            <button onClick={()=>setX(!x)}>click</button>
            <Dialog visiable={x}
                    onOk={()=>{setX(false)
                        console.log('click ok')
                    }}
                    footer={false}
                    onCancel={()=>setX(false)}
                    maskCloseable={true}
                    >
                <div>My dialog</div>
            </Dialog>

            <h1>example2</h1>
            <button onClick={()=>setY(!y)}>click</button>
            <Dialog visiable={y} 
                    buttons={[
                        <button onClick={()=>setY(false)}>1</button>,
                        <button onClick={()=>setY(false)}>2</button>
                    ]}
                    onCancel={()=>setY(false)}
                    >
                <div>My dialog222</div>
            </Dialog>

            <h1>example3</h1>
            <button onClick={()=>alert('ssss')}>alert</button>
            <h1>example3</h1>
            <button onClick={()=>confirm('ssss',()=>console.log('clcik yes 4'),()=>console.log('clcik no 4'))}>confirm</button>
            <h1>example4</h1>
            <button onClick={()=>openModal()}>modal</button>
        </div>
    )
}