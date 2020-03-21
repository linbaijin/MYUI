import React, {useEffect} from "react";
import {getFirstClassName} from "../helpers/classnames";
import Icon from "../icon/icon";


const TreeItem:React.FC<RenderTreeItem> = (props) => {
    const {level,treeProps,treeItem} = props
    const sc = getFirstClassName('myui-tree')
    const onChangeNoChildren = (treeItem:TreeDataItem,isSelected:boolean)=> {
        if(treeProps.multiple) {
            isSelected?treeProps.onChange([...treeProps.selected,treeItem.title]):
                treeProps.onChange(treeProps.selected.filter(v => v!==treeItem.title))
        }

    }
    let allTitle:string[] = []
    const findAllTitle = (treeItem:TreeDataItem) => {
        if(treeItem.children) {
            for (let i = 0;i<treeItem.children.length;i++) {
                allTitle.push(treeItem.children[i].title)
                if(treeItem.children[i].children) {
                    findAllTitle(treeItem.children[i])
                }
            }
            return allTitle
        } else {
            return []
        }
    }

    const onChangeHasChildren = (treeItem:TreeDataItem,isSelected:boolean) => {
        if(treeProps.multiple&&treeItem.children) {
            isSelected?treeProps.onChange([...treeProps.selected,...findAllTitle(treeItem),treeItem.title]):
                treeProps.onChange(treeProps.selected.filter(v => {
                    return !([...findAllTitle(treeItem),treeItem.title].includes(v))
                }))
        }
    }
    const isAllSelected = (treeItem:TreeDataItem) => {
        return treeItem.children?.map((item)=>treeProps.selected.includes(item.title)).every(Boolean)
    }

    useEffect(()=>{
        if(!isAllSelected(treeItem)){
            if(treeProps.selected.includes(treeItem.title)) {
                treeProps.multiple&&treeProps.onChange(treeProps.selected.filter(v => v !== treeItem.title))
            }
        }else {
            if(!treeProps.selected.includes(treeItem.title)) {
                treeProps.multiple&&treeProps.onChange([...treeProps.selected,treeItem.title])
            }
        }
    },[isAllSelected(treeItem)])

    return (
        <div>
            {
                <div key={treeItem.key}
                     className={sc({[`level-${level}`]:true,'item':true})}
                >
                    <div className={sc('text')}>
                        <Icon name="floder_close"/>
                        <input
                            type="checkbox"
                            onChange={(e) => treeItem.children?
                                onChangeHasChildren(treeItem,e.target.checked):
                                onChangeNoChildren(treeItem,e.target.checked)}
                            checked={treeItem.children&&isAllSelected(treeItem)||treeProps.selected.indexOf(treeItem.title)>=0}
                        />
                        {treeItem.title}</div>
                    {treeItem.children?.map(item=>
                        <TreeItem
                            key={item.title}
                            treeItem={item}
                            treeProps={treeProps}
                            level={level+1}
                        />)}
                </div>
            }

        </div>

    )
}

export default TreeItem
