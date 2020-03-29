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
    const {children, dots} = props
    const sc = getFirstClassName('myui-slider')
    const containerRef = useRef<HTMLDivElement>(null)
    const lengthRef = useRef(0)
    const [current, setCurrent] = useState<number>(1)

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

    useEffect(() => {
        cloneNode()
    }, [])

    return (
        <div
            className={sc('')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={sc('container')}
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
                                    className={sc({dot: true, 'dot-active': current === index + 1})}
                                    onClick={() => setCurrent(index + 1)}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

Slider.defaultProps = {
    duration: 0,
    dots: true
}

export default Slider
