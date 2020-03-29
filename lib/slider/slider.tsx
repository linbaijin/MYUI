import React, {useEffect, useRef, useState} from "react";
import './slider.scss'
import {getFirstClassName} from "../helpers/classnames";

interface SliderProps {
    duration?: number
    dots?: boolean
    beforeChaneg?: (from: number, to: number) => void
    afterChange?: (from: number, to: number) => void
}

const handleMouseEnter = () => {

}

const handleMouseLeave = () => {

}

const Slider: React.FC<SliderProps> = (props) => {
    const {children, dots, beforeChaneg,duration} = props
    const sc = getFirstClassName('myui-slider')
    const containerRef = useRef<HTMLDivElement>(null)
    const lengthRef = useRef(0)
    const timerRef = useRef<number | null>(null)
    const current = useRef<number>(1)
    const [, setX] = useState(0)
    //const [prevIndex, setPrevIndex] = useState<number | null>(0)
    const cloneNode = () => {
        const nodeList: HTMLElement[] = []
        containerRef.current?.childNodes.forEach(node => {
            if (node.nodeType === 1) {
                const eleNode = node as HTMLElement
                nodeList.push(eleNode)
                eleNode.style.flexShrink = '0'
            }
        })
        lengthRef.current = nodeList.length
        console.log(nodeList);
        containerRef.current?.append(nodeList[0].cloneNode(true))
        containerRef.current?.prepend(nodeList[nodeList.length - 1].cloneNode(true))
    }

    const controllContainer = (n: number) => {
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(${-100 * n}%)`
        }
    }

    const setCurrent = (n: number) => {
        // first => last
        if (n === lengthRef.current && current.current === 1) {
            console.log('first2last');
            controllContainer(0)
            //last => first
        } else if (n === 1 && current.current === lengthRef.current) {
            controllContainer(lengthRef.current + 1)
        } else {
            controllContainer(n)
        }
        beforeChaneg && beforeChaneg(current.current, n)
        current.current = n
        setX(n)
    }

    const goTo = (n: number) => {
        if (n > lengthRef.current || n < 1 || n === current.current) {
            return
        }
        setCurrent(n)
        //setPrevIndex(current)
    }

    const next = () => {
        console.log('mext',current);
        if(current.current < lengthRef.current) {
            goTo(current.current+1)
        } else {
            goTo(1)
        }
    }

    const autoPlay = () => {
        timerRef.current = window.setInterval(()=>{
            console.log(2333);
            next()
        },duration!*1000)
    }

    // const prev = () => {
    //     if(current > 1) {
    //         goTo(current-1)
    //     } else  {
    //         goTo(lengthRef.current)
    //     }
    // }

    useEffect(() => {
        cloneNode()
        duration&&autoPlay()
        return () => {
            timerRef.current&&window.clearInterval(timerRef.current)
        }
    }, [])

    return (
        <>
            {/*<button onClick={()=>console.log(current)}>btn</button>*/}
        <div
            className={sc('')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={sc({container: true, 'has-transition-class-name': true})}
                ref={containerRef}
            >
                {children}
            </div>
            {
                dots && (
                    <div className={sc('dots-wrapper')}>
                        {
                            React.Children.map(children, (child, index) => (
                                <span
                                    className={sc({dot: true, 'dot-active': current.current === index + 1})}
                                    onClick={() => goTo(index + 1)}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
            </>
    )
}

Slider.defaultProps = {
    duration: 0,
    dots: true
}

export default Slider
