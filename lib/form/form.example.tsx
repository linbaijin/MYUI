import React, { useState, Fragment } from 'react';
import Form from './form'


export default function () {

    const [formData] = useState({
        username:'',
        password:''
    })

    const [fields] = useState([
        {name:'username',label:'用户名',input:{type:'text'}},
        {name:'password',label:'密码',input:{type:'password'}}
    ])

    return (
        <div>
            <Form value={formData} fields={fields} buttons={
                <Fragment>
                    <button>提交</button>
                    <button>取消</button>
                </Fragment>
            } />
        </div>
    )
}