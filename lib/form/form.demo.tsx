import React from 'react';
import FormExample from './form.example';
import Deom from '../../deom';

const FormDemo = () => {
    return (
        <Deom code={require('!!raw-loader!./form.example.tsx').default}>
            <FormExample/>
        </Deom>
    )
}

export default FormDemo