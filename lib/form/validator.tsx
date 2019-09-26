import { FormValue } from './form';

interface FormRule {
    key: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (value: string) => Promise<string>
}

type FormRules = Array<FormRule>
// type FormEntriesArray = Array<[string, Array<string>]>


export interface FormError {
    [K: string]: string[]
}

type Message = string | Promise<string>


const isEmpty = (value: any) => {
    return value === undefined || value === null || value === ''
}

// const flat = (arr: Array<any>): Array<any> => {
//     let result: any[] = []
//     let bStop = true
//     arr.forEach((val) => {
//         if (Array.isArray(val)) {
//             result.push(...val)
//             bStop = false
//         } else {
//             result.push(val)
//         }
//     })
//     if (bStop) {
//         return result
//     }
//     return flat(result)
// }

const simpleFlat = (arr: Array<any>): Array<any> => {
    let result: any[] = []
    arr.forEach((val) => {
        if (Array.isArray(val)) {
            result.push(...val)
        } else {
            result.push(val)
        }
    })
    return result
}

// const formEntries = (array: FormEntriesArray): FormError => {
//     let result: { [key: string]: string[] } = {}
//     array.map(item => { result[item[0]] = item[1] })
//     return result
// };

const zip = (kvList: Array<[string, string]>) => {
    const result: { [k: string]: Array<string> } = {}
    kvList.map(([key, val]) => {
        result[key] = result[key] || []
        result[key].push(val)
    })
    return result
}

const Validator = (formValue: FormValue, rules: FormRules, callBack: (errors: FormError) => void): void => {
    let errors: any = {}; //错误信息容器
    const addError = (key: string, message: Message) => {
        if (errors[key] === undefined) {
            errors[key] = []
        }
        errors[key].push(message)
    };
    rules.map(rule => {
        const value = formValue[rule.key]
        if (rule.required) {
            if (isEmpty(value)) {
                addError(rule.key, 'require')
            }
        }
        if (rule.minLength) {
            if (!isEmpty(value) && value!.length < rule.minLength) {
                addError(rule.key, 'minLength')
            }
        }
        if (rule.maxLength) {
            if (!isEmpty(value) && value!.length > rule.maxLength) {
                addError(rule.key, 'maxLength')
            }
        }
        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, 'pattern')
            }
        }
        if (rule.validator) {
            const promise = rule.validator(value)
            addError(rule.key, promise)
        }
    });
    // console.log(errors)
    const flattenErrors = simpleFlat(Object.keys(errors).map((key) =>
        errors[key].map((promise: Message) => [key, promise])
    ))
    // console.log('flattenErrors', flattenErrors)
    const newPromiseList = flattenErrors.map(([key, promisesOrString]) => (promisesOrString instanceof Promise ? promisesOrString : Promise.reject(promisesOrString))
        .then(() => [key, undefined] //undefined代表没有错
            , (reason: string) => [key, reason]))
    Promise.all(newPromiseList).then((result: Array<[string, string]>) => {
        // console.log('result', result)
        callBack(zip(result.filter(item => item[1] !== undefined)))
    }, () => { })
}

export default Validator