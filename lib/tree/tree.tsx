import React from "react";
import {getFirstClassName} from "../helpers/classnames";

interface TreeDataItem {
    title:string,
    key:string,
    children?:TreeDataItem[]
}

interface renderTreeItem extends TreeProps {
    level:number
}

interface TreeProps {
    treeData:TreeDataItem[],
}

const RenderTreeItem:React.FC<renderTreeItem> = (props) => {
    const {treeData,level} = props
    const sc = getFirstClassName('myui-tree')
    return (
        <div>
            {
                treeData.map((item)=>{
                    return (
                        <div key={item.key}
                             className={sc({[`level-${level}`]:true,'item':true})}
                        >
                            {item.title}
                            {item.children&&<RenderTreeItem level={level+1} treeData={item.children}/>}
                        </div>
                    )
                })
            }

        </div>

    )
}

const Tree:React.FC<TreeProps> = (props) => {
    const {treeData} = props
    return (
            <RenderTreeItem level={1} treeData={treeData}/>
    )
}

export default Tree
