import React from 'react'
import './importAllIcons.js'
import './icon.scss'
import classes from '../helpers/classnames'

interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string
}

const Icon: React.FunctionComponent<IconProps> = ({ name, className, ...restProps }) => {
        return (
            <svg {...restProps}
                className={classes('icon', className)}
                fill="currentcolor">
                <use xlinkHref={`#${name}`} />
            </svg>
        )
    }

export default Icon