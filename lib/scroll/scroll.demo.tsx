import React from 'react';
import ScrollExample from './scroll.example';
import Deom from '../../deom';

const ScrollDemo = () => {
    return (
        <Deom code={require('!!raw-loader!./scroll.example.tsx').default}>
            <ScrollExample/>
        </Deom>
    )
}

export default ScrollDemo