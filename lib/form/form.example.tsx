import React, { useState, Fragment } from 'react';
import Form, {FormValue} from './form'

export default function () {

    const [formData,setFormData] = useState<FormValue>({
        username:'',
        password:''
    })

    const [fields] = useState([
        {name:'username',label:'用户名',input:{type:'text'}},
        {name:'password',label:'密码',input:{type:'password'}}
    ])

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        console.log(formData);
    }

    return (
        <div>
            <Form onSubmit={onSubmit} value={formData} fields={fields} buttons={
                <Fragment>
                    <button type="submit">提交</button>
                    <button>取消</button>
                </Fragment>
            } 
            onChange={(newValue)=>setFormData(newValue)}
            />
        </div>
    )
}