import React from 'react'
import { getFirstClassName } from '../helpers/classnames';
const getFullClassName = getFirstClassName('myui-layout')

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const Footer: React.FunctionComponent<Props> = (props) => {

    const {className,...rest} = props
    return (
        <div className={getFullClassName('footer',{extra:className})} {...rest}>
            footer
        </div>
    )
}

export default Footer