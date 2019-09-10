import React from 'react';
import IconExample from './icon.example';
import Deom from '../../deom';

const IocnDemo = () => {
    return (
        <Deom code={require('!!raw-loader!./icon.example.tsx').default}>
            <IconExample/>
        </Deom>
    )
}

export default IocnDemo