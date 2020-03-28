import React from 'react';
import Demo from "../../deom";
import TreeExample from "./tree.example";

const treeDemo = () => {
    return (
        <Demo code={require('!!raw-loader!./tree.example').default}>
            <TreeExample />
        </Demo>
    )
}

export default treeDemo
