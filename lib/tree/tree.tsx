import React from "react";
import './tree.scss'
import TreeItem from "./tree-item";


const Tree:React.FC<TreeProps> = (props) => {
    if(props.multiple) {
        return (
            <div>
                {props.treeData.map(item=>
                <TreeItem
                    key={item.title}
                    treeItem={item}
                    treeProps={props}
                    level={1}
                />)}
            </div>

        )
    }else {
        return (
            <div>xxx</div>
        )
    }

}

export default Tree
