import React, { useState, Fragment } from 'react';
import Form, {FormValue} from './form';
import Button from '../button/button';
import Validator,{FormError} from './validator';

export default function () {

    const [formData,setFormData] = useState<FormValue>({
        username:'',
        password:''
    })

    const [fields] = useState([
        {name:'username',label:'用户名',input:{type:'text'}},
        {name:'password',label:'密码',input:{type:'password'}}
    ])

    const [errors,setErrors] = useState<FormError>({})

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        const rules = [
            {key:'username',required:true},
            {key:'username',minLength:8,maxLength:16},
            {key:'username',pattern:/^[A-Za-z0-9]+$/},
            {key:'password',required:true},
        ]
        const newErrors =  Validator(formData,rules)
        setErrors(newErrors)
        console.log(newErrors)
        console.log(formData)
    }

    return (
        <div>
            <Form onSubmit={onSubmit} value={formData} fields={fields} buttons={
                <Fragment>
                    <Button level="important" type="submit">提交</Button>
                    <Button level="danger">取消</Button>
                </Fragment>
            }
            errors={errors} 
            onChange={(newValue)=>setFormData(newValue)}
            />
        </div>
    )
}