import React, {useEffect, useRef, useState} from "react";
import {getFirstClassName} from "../helpers/classnames";
import Icon from "../icon/icon";
import useUpdate from "../hooks/useUpdate";


const TreeItem: React.FC<RenderTreeItem> = (props) => {
    const {level, treeProps, treeItem} = props
    const sc = getFirstClassName('myui-tree')
    const onChangeNoChildren = (treeItem: TreeDataItem, isSelected: boolean) => {
        if (treeProps.multiple) {
            isSelected ? treeProps.onChange([...treeProps.selected, treeItem.title]) :
                treeProps.onChange(treeProps.selected.filter(v => v !== treeItem.title))
        }

    }
    let allTitle: string[] = []
    const findAllTitle = (treeItem: TreeDataItem) => {
        if (treeItem.children) {
            for (let i = 0; i < treeItem.children.length; i++) {
                allTitle.push(treeItem.children[i].title)
                if (treeItem.children[i].children) {
                    findAllTitle(treeItem.children[i])
                }
            }
            return allTitle
        } else {
            return []
        }
    }

    const onChangeHasChildren = (treeItem: TreeDataItem, isSelected: boolean) => {
        if (treeProps.multiple && treeItem.children) {
            isSelected ? treeProps.onChange([treeItem.title, ...treeProps.selected, ...findAllTitle(treeItem)]) :
                treeProps.onChange(treeProps.selected.filter(v => {
                    return !([...findAllTitle(treeItem), treeItem.title].includes(v))
                }))
        }
    }
    const isAllSelected = (treeItem: TreeDataItem) => {
        return treeItem.children?.map((item) => treeProps.selected.includes(item.title)).every(Boolean)
    }

    useEffect(() => {
        if (!isAllSelected(treeItem)) {
            if (treeProps.selected.includes(treeItem.title)) {
                treeProps.multiple && treeProps.onChange(treeProps.selected.filter(v => v !== treeItem.title))
            }
        } else {
            if (!treeProps.selected.includes(treeItem.title)) {
                treeProps.multiple && treeProps.onChange([...treeProps.selected, treeItem.title])
            }
        }
    }, [isAllSelected(treeItem)])

    const expand = () => {
        setExpanded(true)
    }

    const collapse = () => {
        setExpanded(false)
    }

    const [expanded, setExpanded] = useState(true)
    const divRef = useRef<HTMLDivElement>(null)

    useUpdate(expanded, () => {
        if (expanded) {
            console.log('打开');
            if (!divRef.current) {
                return
            }
            divRef.current.style.height = 'auto'
            const {height} = divRef.current.getBoundingClientRect()
            divRef.current.style.height = '0px'
            divRef.current.getBoundingClientRect()
            divRef.current.style.height = `${height}px`
        } else {
            console.log('关闭');
            if (!divRef.current) {
                return
            }
            const {height} = divRef.current.getBoundingClientRect()
            divRef.current.style.height = `${height}px`
            divRef.current.getBoundingClientRect()
            divRef.current.style.height = '0px'
        }
    })

    return (
        <div>
            {
                <div key={treeItem.key}
                     className={sc({[`level-${level}`]: true, 'item': true})}
                >
                    <div className={sc('text')}>
                        {
                            expanded ?
                                treeItem.children && <Icon name="floder_open"/> : treeItem.children &&
                                <Icon name="floder_close"/>
                        }
                        <input
                            className={sc('checkbox')}
                            type="checkbox"
                            onChange={(e) => treeItem.children ?
                                onChangeHasChildren(treeItem, e.target.checked) :
                                onChangeNoChildren(treeItem, e.target.checked)}
                            checked={treeItem.children && isAllSelected(treeItem) || treeProps.selected.indexOf(treeItem.title) >= 0}
                        />
                        {treeItem.title}
                        {
                            treeItem.children &&
                            <span onSelect={e => e.preventDefault()}>
                                    {
                                        expanded ?
                                            <span onClick={collapse}>-</span> :
                                            <span onClick={expand}>+</span>
                                    }
                                </span>
                        }
                    </div>
                    <div ref={divRef} className={sc({children: true, collapsed: !expanded})}>
                        {treeItem.children?.map(item =>
                            <TreeItem
                                key={item.title}
                                treeItem={item}
                                treeProps={treeProps}
                                level={level + 1}
                            />)}
                    </div>
                </div>
            }

        </div>

    )
}

export default TreeItem
