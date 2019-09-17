import {FormValue} from './form';

interface FormRule {
    key:string;
    required?:boolean;
    minLength?:number;
    maxLength?:number;
    pattern?:RegExp;
}

type FormRules = Array<FormRule>

export interface FormError {
    [K:string]:string[]
}

const isEmpty = (value:any) => {
    return value === undefined || value === null || value === ''
}

const Validator = (formValue:FormValue, rules:FormRules):FormError => {
    let errors:any = {} //错误信息容器
    const addError = (key:string,message:string) => {
        if(errors[key] === undefined) {
            errors[key] = []
        }
        errors[key].push(message)
    }
    rules.map(rule =>{
        const value = formValue[rule.key]
        if(rule.required) {
            if(isEmpty(value)) {
                addError(rule.key,'必填')
            }
        }
        if(rule.minLength) {
            if(!isEmpty(value) && value!.length < rule.minLength) {
                addError(rule.key,'太短')
            }
        }
        if(rule.maxLength) {
            if(!isEmpty(value) && value!.length > rule.maxLength) {
                addError(rule.key,'太长')
            }
        }
        if(rule.pattern) {
            if(!(rule.pattern.test(value))) {
                addError(rule.key,'格式不正确')
            }
        }
    })
    return errors
}

export default Validator