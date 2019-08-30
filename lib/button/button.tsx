import React from 'react'
// import {getFirstClassName} from '../classes'

interface Props {
    type?:'button'|'submit'|'rest'
}

const Button:React.FunctionComponent<Props> = (props) => {
    return (
        <button style={{backgroundColor:'red'}}>{props.children}</button>
    )
}

export default Button