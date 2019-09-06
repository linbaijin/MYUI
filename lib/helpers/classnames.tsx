// const IsTrue = (value:string):string => value

function classes(...names:(string|undefined)[]) {
    // console.log(names)
    return names.filter(Boolean).join(' ')
}

export default classes




interface Options {
    extra:string | undefined
}

interface ClassToggle {
    [K:string]: boolean
}

function getFirstClassName(perfix:string) {
    return function (name?:string | ClassToggle,options?:Options) {

        let name2
        let result
        if(typeof name === 'string' || typeof name === 'undefined') {
            name2 = name
            result = [perfix,name2].filter(Boolean).join('-')
        }else {
            name2 = Object.entries(name).filter(kv=>kv[1]).map(kv=>kv[0])
            //['hasaside','x']
            result = name2.map(n=>
                [perfix,n].filter(Boolean).join('-')
            ).join(' ')
        }

        
        if(options&&options.extra) {
            return [result,options.extra].filter(Boolean).join(' ')
        }else {
            return result
        }
    }
}

export {getFirstClassName}