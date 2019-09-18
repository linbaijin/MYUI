import React, { InputHTMLAttributes } from 'react'
import classes from '../helpers/classnames'
import './input.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const Input:React.FunctionComponent<Props> = (props) => {
    const {className,...rest} = props
    return (
        <input className={classes('myui-input')} {...rest} />
    )
}

export default Input