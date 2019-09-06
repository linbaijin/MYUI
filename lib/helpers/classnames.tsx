// const IsTrue = (value:string):string => value

function classes(...names: (string | undefined)[]) {
    // console.log(names)
    return names.filter(Boolean).join(' ')
}

export default classes




interface Options {
    extra: string | undefined
}

interface ClassToggle {
    [K: string]: boolean
}

function getFirstClassName(perfix: string) {
    return (name: string | ClassToggle, options?: Options) => 
        Object
            .entries(name instanceof Object ? name : { [name]: name })
            .filter(kv => kv[1] !== false)
            .map(kv => kv[0])
            .map(name => [perfix, name]
                .filter(Boolean)
                .join('-'))
            .concat(options && options.extra || [])
            .join(' ')  
}

export { getFirstClassName }