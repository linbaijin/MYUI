import React, { ReactElement } from 'react'
import { getFirstClassName } from '../classes';
const getFullClassName = getFirstClassName('myui-layout');
import './layout.scss'
import Aside from './aside';

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: ReactElement | Array<ReactElement>
}

const Layout:React.FunctionComponent<Props> = (props) => {
    const {className,...rest} = props
    let hasAside = false

    if((props.children as Array<ReactElement>).length) {
        (props.children as Array<ReactElement>).map(node => {
            if(node.type === Aside) {
                hasAside = true 
            }
        })
    }
    
    return (
        <div className={getFullClassName('',{extra:[className,hasAside&&'hasAside'].join(' ')})} {...rest}>
            {props.children}
        </div>
    )
}

export default Layout