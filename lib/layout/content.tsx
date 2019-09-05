import React from 'react'
import { getFirstClassName } from '../classes';
const getFullClassName = getFirstClassName('myui-layout')

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const Content:React.FunctionComponent<Props> = (props) => {
    const {className,...rest} = props
    return (
        <div className={getFullClassName('content',{extra:className})} {...rest}>
            content
        </div>
    )
}

export default Content