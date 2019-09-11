import React from 'react';

interface Props {
    value:{[K:string]:any},
    fields:Array<{name:string,label:string,input:{type:string}}>,
    buttons:React.ReactFragment
}

const Form:React.FunctionComponent<Props> = (props) => (
    <form>
        {
            props.fields.map(f =>
            <div>
                <label htmlFor="">{f.label}</label>
                <input type={f.input.type}/>
            </div>
            )
        }
    </form>
)

export default Form