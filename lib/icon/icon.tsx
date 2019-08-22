import React from 'react'
import './importAllIcons.js'
import './icon.scss'

interface IconProps {
    name:string
    onClick?:React.MouseEventHandler<HTMLLIElement>
}

const Icon:React.FunctionComponent<IconProps> = (props) => {
    return (
        <i onClick={props.onClick}>
            <svg className="icon" fill="currentcolor">
                <use xlinkHref={`#${props.name}`}/>
            </svg>
        </i>
    )
}

export default Icon