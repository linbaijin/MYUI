import React from "react";
import {getFirstClassName} from "../helpers/classnames";
import './tree.scss'
import Icon from "../icon/icon";

export interface TreeDataItem {
    title:string,
    key:string,
    children?:TreeDataItem[]
}

interface renderTreeItem extends TreeProps {
    level:number
}

interface TreeProps {
    treeData:TreeDataItem[],
    selectedValues:string[]
    onChange:(item:TreeDataItem,isSelected:boolean) => void
}

const RenderTreeItem:React.FC<renderTreeItem> = (props) => {
    const {treeData,level,onChange,selectedValues} = props
    const sc = getFirstClassName('myui-tree')
    return (
        <div>
            {
                treeData.map((item)=>{
                    return (
                        <div key={item.key}
                             className={sc({[`level-${level}`]:true,'item':true})}
                        >
                            <div className={sc('text')}>
                                <Icon name="floder_close"/>
                                <input
                                    type="checkbox"
                                    onChange={(e) => onChange(item,e.target.checked)}
                                    checked={selectedValues.indexOf(item.title)>=0}
                                />
                                {item.title}</div>
                            {item.children&&<RenderTreeItem selectedValues={selectedValues} level={level+1} treeData={item.children} onChange={onChange} />}
                        </div>
                    )
                })
            }

        </div>

    )
}

const Tree:React.FC<TreeProps> = (props) => {
    const {treeData,onChange,selectedValues} = props
    return (
            <RenderTreeItem selectedValues={selectedValues} level={1} treeData={treeData} onChange={onChange} />
    )
}

export default Tree
