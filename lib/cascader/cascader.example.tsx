import React from 'react';
import Cascader, {Option} from "./cascader";

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake'
                    }
                ]
            }
        ]
    },
    {
        value: 'jiangshu',
        label: 'Jiangshu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                disabled: true,
                children: [
                    {
                        value: 'jiangning',
                        label: 'Jiangning'
                    }
                ]
            }
        ]
    },
    {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
            {
                value: 'pudong',
                label: 'Pudong',
                children: [
                    {
                        value: 'lujiazhui',
                        label: 'Lujiazhui'
                    }
                ]
            }
        ]
    }
]

const CascaderExample = () => {
    const onChange = (valueArr:string[],selectOptions:Option[]) => {
        console.log(valueArr);
        console.log(selectOptions);
    }
    const onSelect = (valueArr:string[],selectOptions:Option[]) => {
        console.log(valueArr);
        console.log(selectOptions);
    }

    return (
        <div style={{marginBottom:10}}>
            <h1 style={{marginBottom:10}}>Cascader 级联选择</h1>
            <Cascader
                options={options}
                placeholder='cascader'
                onChange={onChange}
                onSelect={onSelect}
            />
        </div>

        )
}

export default CascaderExample