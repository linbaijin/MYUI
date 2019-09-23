import React, { useState, Fragment } from 'react';
import Form, {FormValue} from './form';
import Button from '../button/button';
import Validator,{FormError} from './validator';

const userArray = ['xxx','yyy','zzz'];
const checkUserName = (username:string,succeed:() => void, fail:() => void) => {
    setTimeout(() => {
        console.log('我现在知道用户名是否存在')
        if(userArray.indexOf(username)==-1){
            succeed()
        } else {
            fail()
        }
    },1000)
}


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
            {key:'username',minLength:1,maxLength:16},
            {key:'username',pattern:/^[A-Za-z0-9]+$/},
            {key:'password',required:true},
            {
                key:'username',validator: {
                    name:'unique',
                    validate(username:string){
                        console.log('有人调用validate了')
                        return new Promise<void>((resolve,reject) => {
                            checkUserName(username,resolve,reject)
                        })
                        
                    }
                }
            }
        ]
        Validator(formData,rules,(newErrors)=>{
            console.log('得到Promise的error',newErrors)
            setErrors(newErrors)
        })
        console.log('formData',formData)
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
            customTransformError={{unique:'用户名已存在'}}
            onChange={(newValue)=>setFormData(newValue)}
            />
        </div>
    )
}