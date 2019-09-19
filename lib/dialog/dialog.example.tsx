import React, {useState} from 'react'
import Dialog,{alert,confirm,modal} from './dialog'
import Button from '../button/button'

export default function () {
    const [x,setX] = useState(false)
    const [y,setY] = useState(false)
    const openModal = () => {
       const close = modal(<h1>hello<Button onClick={()=>close()}>button</Button></h1>)
    }
    return (
        <div>
            <h1>example1</h1>
            <Button level="important" onClick={()=>setX(!x)}>click</Button>
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
            <Button onClick={()=>setY(!y)}>click</Button>
            <Dialog visiable={y} 
                    buttons={[
                        <Button level="important" onClick={()=>setY(false)}>1</Button>,
                        <Button level="danger" onClick={()=>setY(false)}>2</Button>
                    ]}
                    onCancel={()=>setY(false)}
                    >
                <div>My dialog222</div>
            </Dialog>

            <h1>example3</h1>
            <Button level="danger" onClick={()=>alert('ssss')}>alert</Button>
            <h1>example3</h1>
            <Button level="important" onClick={()=>confirm('ssss',()=>console.log('clcik yes 4'),()=>console.log('clcik no 4'))}>confirm</Button>
            <h1>example4</h1>
            <Button  onClick={()=>openModal()}>modal</Button>
        </div>
    )
}