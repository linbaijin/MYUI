

interface Options {
    extra:string | undefined
}

function getFirstClassName(perfix:string) {
    return function (name?:string,options?:Options) {
        const result =  [perfix,name].filter(Boolean).join('-')
        if(options&&options.extra) {
            return [result,options.extra].filter(Boolean).join(' ')
        }else {
            return result
        }
    }
}

export {getFirstClassName}