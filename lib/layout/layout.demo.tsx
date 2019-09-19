import React from 'react';
import LayoutExample from './layout.example';
import Deom from '../../deom';

const LayoutDemo = () => {
    return (
        <Deom code={require('!!raw-loader!./layout.example.tsx').default}>
            <LayoutExample/>
        </Deom>
    )
}

export default LayoutDemo