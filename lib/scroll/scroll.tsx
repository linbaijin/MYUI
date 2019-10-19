import React, { HTMLAttributes, useEffect, useRef, useState, UIEventHandler } from 'react'
import ScrollbarWidth from './scrollBar-width'
import './scroll.scss'


interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll:React.FunctionComponent<Props> = (props) => {
    const {children, ...rest} = props
    const containerRef = useRef<HTMLDivElement>(null)
    const [barHeight, setBarHeight] = useState(0)
    const [barTop, setBarTop] = useState(0)
    const onScroll:UIEventHandler<HTMLDivElement> = () => {
        const {current} = containerRef
        const scrollHeight = current!.scrollHeight
        const viewHeight = current!.getBoundingClientRect().height
        const scrollTop = current!.scrollTop
        setBarTop(scrollTop * viewHeight / scrollHeight) 
    }

    
    useEffect(() => {
        const scrollHeight = containerRef.current!.scrollHeight;//总滚动高度
        const viewHeight = containerRef.current!.getBoundingClientRect().height//可视范围高度
        setBarHeight(viewHeight * viewHeight / scrollHeight)
    },[])
    return <div className="myui-scroll" {...rest}>
        <div className="myui-scroll-inner" onScroll={onScroll} style={{right:-ScrollbarWidth()}}
            ref={containerRef}
        >   
            {children}
        </div>
        <div className="myui-scroll-track">
            <div className="myui-scroll-bar" style={{height:barHeight,transform:`translateY(${barTop}px)`}}></div>
        </div>
    </div>
}

export default Scroll