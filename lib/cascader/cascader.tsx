import React, {useEffect, useRef, useState} from "react";
import './cascader.scss'
import CascaderMenu from "./cascaderMenu";
import {Icon} from "../index";
import classes from "../helpers/classnames";

export interface Option {
    value:string
    label:string
    children?:Option[],
    disable?:boolean
}

interface Props {
    options:Option[]
    placeholder?:string
    onChange?: (valueArr: string[], selectedOptions: Option[]) => any
    onSelect?: (valueArr: string[], selectedOptions: Option[]) => any
}




const Cascader:React.FC<Props>  = (props) => {

    const {options,placeholder} = props
    const [inputValueFromLabel,setInputValueFromLabel] = useState<string>('')
    const [valueArr,setValueArr] = useState<string[]>([])
    const [selectedOptions,setSelectedOptions] = useState<Option[]>([])
    const [menuVisible,setMenuVisible] = useState<boolean>(false)
    const cascaderEl = useRef<HTMLDivElement>(null)
    //监听最后一层
    const handleClickLastLevel = (option:Option,level:number) => {
        const {onChange} = props
        if(valueArr[level] === option.value){
            setMenuVisible(false)
        } else {
          const valueArrCopy = [...valueArr]
          const selectOptionsCopy = [...selectedOptions]
            valueArrCopy.splice(level,1,option.value)
            selectOptionsCopy.splice(level,1,option)
            setValueArr(valueArrCopy)
            setSelectedOptions(selectOptionsCopy)
            setInputValueFromLabel(getLabelString(selectOptionsCopy))
            setMenuVisible(false)
            onChange&&onChange(valueArrCopy,selectOptionsCopy)
        }
    }

    //监听中间层
    const handleClickMiddleLevel = (option:Option,level:number) => {
        const {onSelect} = props
        // 相同，截掉后面的
        if(valueArr[level]===option.value) {
            setValueArr(pre=>pre.slice(0,level+1))
            setSelectedOptions(pre=>pre.slice(0,level+1))
            onSelect&&onSelect(valueArr,selectedOptions)
        } else {
            const valueArrCopy = [...valueArr]
            const selectOptionsCopy = [...selectedOptions]
            valueArrCopy.splice(level,1,option.value)
            selectOptionsCopy.splice(level,1,option)
            setValueArr(valueArrCopy.slice(0,level+1))
            setSelectedOptions(selectOptionsCopy.slice(0,level+1))
            onSelect&&onSelect(valueArrCopy.slice(0,level+1),selectOptionsCopy.slice(0,level+1))
        }
    }

    const handleChangeValue = (option:Option,level:number) => {
        !option.children?handleClickLastLevel(option,level):handleClickMiddleLevel(option,level)
    }

    const handleClickDocument:EventListener = e => {
        console.log(menuVisible);
        const {target} = e
        if(!cascaderEl.current!.contains(target as Node)&&menuVisible) {
            setMenuVisible(false)
        }
    }

    const handleClickInput = () => {
        setMenuVisible(true)
    }

    const getLabelString = (selectedOptions:Option[]):string => {
        console.log('...',selectedOptions);
        return selectedOptions.map(item => item.label).join(' / ')
    }

    useEffect(()=>{
        document.addEventListener('click',handleClickDocument,true)
        return () => {
            document.removeEventListener('click',handleClickDocument,true)
        }
    })

    const handleOnClear = () => {
        setValueArr([])
        setSelectedOptions([])
        setInputValueFromLabel('')
        setMenuVisible(false)
    }

    return <div ref={cascaderEl} className={classes("myui-cascader",menuVisible?'active':'')}>
        <span className='myui-cascader-input-wrapper'>
            {placeholder&&!inputValueFromLabel&&
            (<span className='myui-cascader-placeholder'>{placeholder}</span>)}
            <input
                className='myui-cascader-input'
                onClick={handleClickInput}
                readOnly={true}
                value={inputValueFromLabel}
            />
            {
                !inputValueFromLabel&&
                (
                    <span className="myui-cascader-icon-wrapper arrow">
                        <Icon name="rightArrow"/>
                    </span>
                )
            }

            {
                inputValueFromLabel&&
                (
                    <span
                        className="myui-cascader-icon-wrapper close"
                        onClick={handleOnClear}
                    >
                        <Icon name="close"/>
                    </span>
                )
            }

        </span>
        {
            menuVisible&&
            (
                <div className="myui-cascader-menu-container">
                    <CascaderMenu
                        options={options}
                        level={0}
                        handleChangeValue={handleChangeValue}
                        valueArr={valueArr}
                    />
                </div>
            )
        }
        </div>
}



export default Cascader