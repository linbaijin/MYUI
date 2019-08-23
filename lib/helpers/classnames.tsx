// const IsTrue = (value:string):string => value

function classes(...names:(string|undefined)[]) {
    // console.log(names)
    return names.filter(Boolean).join(' ')
}

export default classes