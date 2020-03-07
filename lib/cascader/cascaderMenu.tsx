import React, {useState} from "react";
import {Icon} from "../index";
import {Option} from "./cascader";
import classes from "../helpers/classnames";

interface CascaderMenuProps {
    options:Option[]
    level:number
    handleChangeValue:(option:Option,level:number) => any
    valueArr:string[]
    itemClassName?: string
    itemStyle?: React.CSSProperties
}

const CascaderMenu:React.FC<CascaderMenuProps> = (props) => {
    const {options,level,handleChangeValue,valueArr} = props
    const [currentOption,setCurrentOption] = useState<Option|''>('')
    const handleClickItem = (option:Option) => {
        (!currentOption||(option.value!==currentOption.value))&&setCurrentOption(option)
        //console.log('bbb',currentOption);
        handleChangeValue(option,level)
    }
    return(
        <>
            <ul className="myui-cascader-menu">
                {
                    options.map(option=>(
                        <li
                            className={classes("myui-cascader-menu-item",
                                (valueArr&&valueArr.indexOf(option.value)>-1)?'selected':'') }
                            onClick={()=>handleClickItem(option)}
                            key={option.value}>
                            {option.label}
                            {option.children&&option.children.length&&(
                                <span className="item-icon-wrapper">
                                        <Icon name="rightArrow"/>
                                    </span>
                            )}
                        </li>
                    ))
                }
            </ul>
            {
                currentOption&&currentOption.children&&
                currentOption.children.length&&(
                    <CascaderMenu
                        options={currentOption.children}
                        level={level+1}
                        handleChangeValue={handleChangeValue}
                        valueArr={valueArr}
                    />
                )
            }

        </>
    )
}

export default CascaderMenu