import { FormValue } from './form';

interface FormRule {
    key: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: { name: string, validate: (value: string) => Promise<void> }
}

type FormRules = Array<FormRule>
type FormEntriesArray = Array<[string, Array<string>]>


export interface FormError {
    [K: string]: string[]
}

interface Message {
    message: string;
    promise?: Promise<any>
}

const isEmpty = (value: any) => {
    return value === undefined || value === null || value === ''
}

const flat = (arr: Array<any>): Array<any> => {
    let result: any[] = []
    let bStop = true
    arr.forEach((val) => {
        if (Array.isArray(val)) {
            result.push(...val)
            bStop = false
        } else {
            result.push(val)
        }
    })
    if (bStop) {
        return result
    }
    return flat(result)
}

const formEntries = (array: FormEntriesArray): FormError => {
    let result: { [key: string]: string[] } = {}
    array.map(item => { result[item[0]] = item[1] })
    return result
};

const Validator = (formValue: FormValue, rules: FormRules, callBack: (errors: FormError) => void): void => {
    let errors: any = {} //错误信息容器
    const addError = (key: string, message: Message) => {
        if (errors[key] === undefined) {
            errors[key] = []
        }
        errors[key].push(message)
    }
    rules.map(rule => {
        const value = formValue[rule.key]
        if (rule.required) {
            if (isEmpty(value)) {
                addError(rule.key, { message: '必填' })
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value!.length < rule.minLength) {
                addError(rule.key, { message: '太短' })
            }
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value!.length > rule.maxLength) {
                addError(rule.key, { message: '太长' })
            }
        }
        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, { message: '格式不正确' })
            }
        }
        if (rule.validator) {
            const promise = rule.validator.validate(value)
            addError(rule.key, { message: '用户名已存在', promise })
        }
    })
    const promiseList = flat(Object.values(errors))
        .filter((item: Message) => item.promise)
        .map((item: Message) => item.promise)
    Promise.all(promiseList)
        .then(() => {
            console.log('所有promise成功', errors)
            callBack(errors)
        }, () => {
            const newErrors: FormError = formEntries(Object.keys(errors).map((key) => [key, errors[key].map((item: Message) => item.message)]))
            callBack(newErrors)
            console.log('有一个promise失败', newErrors)
        })
    // console.log(Object.values(errors))
}

export default Validator