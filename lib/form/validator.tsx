import {FormValue} from './form';

interface FormRule {
    key:string;
    required?:boolean;
    minLength?:number;
    maxLength?:number;
    pattern?:RegExp;
    validator?:{name:string,validate:(value:string)=>Promise<void>}
}

type FormRules = Array<FormRule>

export interface FormError {
    [K:string]:string[]
}

const isEmpty = (value:any) => {
    return value === undefined || value === null || value === ''
}

const flat = (arr:Array<any>):Array<any> => {
    let result: any[] = []
    let bStop = true
    arr.forEach((val) => {
        if(Array.isArray(val)) {
            result.push(...val)
            bStop = false
        } else {
            result.push(val)
        }
    })
    if(bStop) {
        return result
    }
    return flat(result)
}



const Validator = (formValue:FormValue, rules:FormRules,callBack:(errors:FormError)=>void):void => {
    let errors:any = {} //错误信息容器
    const addError = (key:string,message:string|Promise<any>) => {
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
        if(rule.validator) {
            const promise = rule.validator.validate(value)
            addError(rule.key,promise)
        }
    })
    Promise.all(flat(Object.values(errors))).then(()=> {
        console.log('所有promise成功')
        callBack(errors)
    },()=>{
        callBack(errors)
        console.log('有一个promise失败')
    })
    console.log(Object.values(errors))
}

export default Validator