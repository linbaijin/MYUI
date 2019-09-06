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
    return function (name: string | ClassToggle, options?: Options) {

        const name2 = (typeof name === 'string' || typeof name === 'undefined') ?
            { [name]: name } : name
        const scope = Object.entries(name2)
            .filter(kv => kv[1] !== false)
            .map(kv => kv[0])
            .map(name =>
                [perfix, name].filter(Boolean).join('-')
            ).join(' ')

        if (options && options.extra) {
            return [scope, options.extra].filter(Boolean).join(' ')
        } else {
            return scope
        }
    }
}

export { getFirstClassName }