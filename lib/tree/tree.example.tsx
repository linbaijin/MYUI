import React, {useState} from "react";
import Tree from './tree'

const TreeExample = () => {

    const [treeData] = useState([
        {
            title: '1',
            key: '1',
            children:[
                {
                    title: '1.1',
                    key: '1.1',
                    children:[
                        {
                            title:'1.1.1',
                            key:'1.1.1'
                        }
                    ]
                }
            ]
        },
        {
            title: '2',
            key: '2',
            children:[
                {
                    title: '2.1',
                    key: '2.1',
                    children:[
                        {
                            title:'2.1.1',
                            key:'2.1.1'
                        }
                    ]
                }
            ]
        },
    ])

    return (
        <div>
            <h1>Tree</h1>
            <Tree treeData={treeData}/>
        </div>
    )
}

export default TreeExample
