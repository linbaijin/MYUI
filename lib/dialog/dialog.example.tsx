import React, {useState} from 'react'
import Dialog from './dialog'

export default function () {
    const [x,setX] = useState(false)
    return (
        <div>
            <button onClick={()=>setX(!x)}>click</button>
            <Dialog visiable={x}>
                <div>My dialog</div>
            </Dialog>
        </div>
    )
}