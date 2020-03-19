import React, {useState} from "react";
import Tree, {TreeDataItem} from './tree'

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
    const [selectedValues,setSelectedValues] = useState(['1.1','2.1'])
    const onChange = (item:TreeDataItem,isSelected:boolean)=> {
        console.log(item, isSelected);
        isSelected?setSelectedValues([...selectedValues,item.title]):
            setSelectedValues(selectedValues.filter(v => v!==item.title))
    }

    return (
        <div>
            <h1>Tree</h1>
            <div style={{width:300}}>
                <Tree treeData={treeData} selectedValues={selectedValues} onChange={onChange}/>
            </div>
        </div>
    )
}

export default TreeExample
