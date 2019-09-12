import React,{ReactFragment} from 'react';

interface Props {
    value:{[K:string]:any};
    fields:Array<{name:string,label:string,input:{type:string}}>;
    buttons:ReactFragment;
    onSubmit:React.FormEventHandler;
}

const Form:React.FunctionComponent<Props> = (props) => (
    <form onSubmit={props.onSubmit}>
        {
            props.fields.map(f =>
            <div key={f.name}>
                <label htmlFor="">{f.label}</label>
                <input type={f.input.type}/>
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

export default Form