import React from "react";
import Demo from "../../deom";
import CascaderExample from "./cascader.example";

const CascaderDemo = () => {
    return (
        <Demo code={require('!!raw-loader!./cascader.example.tsx').default}>
            <CascaderExample/>
        </Demo>
    )
}

export default CascaderDemo