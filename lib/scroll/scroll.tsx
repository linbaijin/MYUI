import React, { HTMLAttributes, useEffect, useRef, useState, UIEventHandler, MouseEventHandler } from 'react'
import ScrollbarWidth from './scrollBar-width'
import './scroll.scss'


interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll:React.FunctionComponent<Props> = (props) => {
    const {children, ...rest} = props
    const containerRef = useRef<HTMLDivElement>(null)
    const [barHeight, setBarHeight] = useState(0)
    const [barTop, _setBarTop] = useState(0)
    const setBarTop = (number:number) => {
        if(number<0) {return}
        const {current} = containerRef
        const scrollHeight = current!.scrollHeight
        const viewHeight = current!.getBoundingClientRect().height
        const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight
        if(number > maxBarTop){return}
        _setBarTop(number)
    }
    const onScroll:UIEventHandler<HTMLDivElement> = () => {
        const {current} = containerRef
        const scrollHeight = current!.scrollHeight
        const viewHeight = current!.getBoundingClientRect().height
        const scrollTop = current!.scrollTop
        setBarTop(scrollTop * viewHeight / scrollHeight) 
    }
    useEffect(() => {
        const scrollHeight = containerRef.current!.scrollHeight//总滚动高度
        const viewHeight = containerRef.current!.getBoundingClientRect().height//可视范围高度
        setBarHeight(viewHeight * viewHeight / scrollHeight)
    },[])

    useEffect(() => {
        document.addEventListener('mousemove',onMouseMoveBar)
        document.addEventListener('mouseup',onMouseUpBar)
        document.addEventListener('selectstart',onSelect)
        return () => {
            document.removeEventListener('mousemove',onMouseMoveBar)
            document.removeEventListener('mouseup',onMouseUpBar)
        }
    },[])

    const draggingRef = useRef(false)
    const firstYRef = useRef(0)
    const firstBarTopRef = useRef(0)
    const onMouseDownBar:MouseEventHandler = (e) => {
        draggingRef.current = true
        firstYRef.current = e.clientY //记录mouseDown的初始位置
        firstBarTopRef.current = barTop //记录bar的初始位置
        console.log('start')
    }
    const onMouseMoveBar = (e:MouseEvent) => {
        if(draggingRef.current){
            const delta = e.clientY - firstYRef.current //鼠标移动的距离
            const newBarTop = firstBarTopRef.current + delta
            setBarTop(newBarTop)
            const scrollHeight = containerRef.current!.scrollHeight
            const viewHeight = containerRef.current!.getBoundingClientRect().height
            containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight
        }
    }
    const onMouseUpBar = (e:MouseEvent) => {
        draggingRef.current = false
        console.log('end')
    }

    const onSelect = (e:Event) => {
        if (draggingRef.current) {
            e.preventDefault()
        }
    }

    return <div className="myui-scroll" {...rest}>
        <div className="myui-scroll-inner" onScroll={onScroll} style={{right:-ScrollbarWidth()}}
            ref={containerRef}
        >   
            {children}
        </div>
        <div className="myui-scroll-track" onMouseDown={onMouseDownBar}>
            <div className="myui-scroll-bar" style={{height:barHeight,transform:`translateY(${barTop}px)`}}></div>
        </div>
    </div>
}

export default Scroll