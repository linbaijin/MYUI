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
                            key:'1.1.1',
                            children:[
                                {
                                    title:'1.1.1.1',
                                    key:'1.1.1.1',
                                }
                            ]
                        },
                        {
                            title:'1.1.2',
                            key:'1.1.2'
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
    const [selectedValues,setSelected] = useState<string[]|[]>([])

    return (
        <div>
            <h1>Tree</h1>
            <div style={{width:300}}>
                <Tree
                    treeData={treeData}
                    selected={selectedValues}
                    onChange={(selected)=>{
                        console.log('selected',selected);
                        setSelected(selected)}}
                    multiple={true}
                />
            </div>
        </div>
    )
}

export default TreeExample
