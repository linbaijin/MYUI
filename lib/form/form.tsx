import React, { ReactFragment } from 'react';
import Input from '../input/input';
import { FormError } from './validator';
import classes from '../helpers/classnames';
import './form.scss'

export interface FormValue {
    [K: string]: any;
}

interface Props {
    value: FormValue;
    fields: Array<{ name: string, label: string, input: { type: string } }>;
    buttons: ReactFragment;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: (value: FormValue) => void;
    errors: FormError;
}

const Form: React.FunctionComponent<Props> = (props) => {

    const formData = props.value
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        props.onSubmit(e)
    }
    const onInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormValue = { ...formData, [name]: e.target.value }
        props.onChange(newFormValue)
    }

    return (
        <form onSubmit={onSubmit}>
            <table className={classes('myui-form-table')}>
                <tbody>
                    {
                        props.fields.map(f => {
                            return (
                              <tr className={classes('myui-form-tr')} key={f.name}>
                                <td className={classes('myui-form-td')}>
                                    <label className={classes('myui-form-label')} htmlFor="">{f.label}</label>
                                </td>
                                <td className={classes('myui-form-td')}>
                                    <Input className={props.errors.hasOwnProperty(f.name)?'myui-form-errorInput':''} value={formData[f.name]}
                                     onChange={onInputChange.bind(null, f.name)} type={f.input.type} />
                                    <div className={classes('myui-form-error')}>
                                        {
                                        props.errors[f.name] ? props.errors[f.name].join('，') :
                                        <span>&nbsp;</span>
                                        }
                                    </div>
                                </td>
                              </tr>
                            )
                        }
                            
                                
                        )
                    }
                    <tr className={classes('myui-form-tr')}>
                        <td className={classes('myui-form-td')} />
                        <td className={classes('myui-form-td')}>
                            {
                                props.buttons
                            }
                        </td>

                    </tr>
                </tbody>
            </table>


        </form>
    )
}



export default Form