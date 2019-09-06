import React from 'react'
import { getFirstClassName } from '../helpers/classnames';
const getFullClassName = getFirstClassName('myui-layout')

interface Props extends React.HTMLAttributes<HTMLElement> {

}

const Header:React.FunctionComponent<Props> = (props) => {
    const {className,...rest} = props
    return (
        <div className={getFullClassName('header',{extra:className})} {...rest}>
            header
        </div>
    )
}

export default Header