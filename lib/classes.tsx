function getFirstClassName(perfix:string) {
    return function (name?:string) {
        return [perfix,name].filter(Boolean).join('-')
    }
}

export {getFirstClassName}