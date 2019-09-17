import React, { ReactFragment } from 'react';
import {FormError} from './validator';

export interface FormValue {
    [K:string]:any;
}

interface Props {
    value: FormValue;
    fields: Array<{ name: string, label: string, input: { type: string } }>;
    buttons: ReactFragment;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange:(value:FormValue) => void;
    errors:FormError;
}

const Form: React.FunctionComponent<Props> = (props) => {

    const formData = props.value
    const onSubmit:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        props.onSubmit(e)
    }
    const onInputChange = (name:string,e:React.ChangeEvent<HTMLInputElement>) => {
        const newFormValue = {...formData,[name]:e.target.value}
        props.onChange(newFormValue)
    }

    return (
        <form onSubmit={onSubmit}>
            {
                props.fields.map(f =>
                    <div key={f.name}>
                        <label htmlFor="">{f.label}</label>
                        <input value={formData[f.name]} onChange={onInputChange.bind(null,f.name)} type={f.input.type} />
                        <div>{props.errors[f.name]?props.errors[f.name].join(','):''}</div>
                    </div>
                )
            }
            <div>
                {
                    props.buttons
                }
            </div>
        </form>
    )
}



export default Form