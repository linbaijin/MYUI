import React, { HTMLAttributes } from 'react'
import './scroll.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll:React.FunctionComponent<Props> = (props) => {
    const {children, ...rest} = props
    return <div className="myui-scroll" {...rest}>
        <div className="myui-scroll-inner">
            {children}
        </div>
    </div>
}

export default Scroll