import React from 'react';
import DialogExample from './dialog.example';
import Deom from '../../deom';

const DialogDemo = () => {
    return (
        <Deom code={require('!!raw-loader!./dialog.example.tsx').default}>
            <DialogExample/>
        </Deom>
    )
}

export default DialogDemo