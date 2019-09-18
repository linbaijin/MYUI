import React, { ButtonHTMLAttributes } from 'react'
// import {getFirstClassName} from '../classes'
import classes from '../helpers/classnames';
import './button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    level?:'important' | 'danger'| 'normal'
}

const Button:React.FunctionComponent<Props> = (props) => {
    const {className, children, level, ...rest} = props
    return (
        <button className={classes('myui-button',`myui-button-${level}`,className)} {...rest}>{children}</button>
    )
}

Button.defaultProps = {
    level:'normal'
}

export default Button