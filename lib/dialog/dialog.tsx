import React,{Fragment, ReactElement, ReactNode} from 'react'
import ReactDOM from 'react-dom';
import './dialog.scss'
import {Icon} from '../index'
import {getFirstClassName} from '../classes'

interface Props {
    visiable:boolean
    buttons?:Array<ReactElement>
    onCancel?:React.MouseEventHandler
    onOk?:React.MouseEventHandler
    maskCloseable?:boolean
    footer?:boolean
}

const getFullClassName = getFirstClassName('myui-dialog')

const Dialog:React.FunctionComponent<Props> = (props) => {
    const onCancel:React.MouseEventHandler = (e) => {
        props.onCancel&&props.onCancel(e)
    }

    const onOk:React.MouseEventHandler = (e) => {
        props.onOk&&props.onOk(e)
    }

    const x = (
            props.visiable?
            <Fragment>
                <div className={getFullClassName('mask')} onClick={(e)=>props.maskCloseable?onCancel(e):null}>
                </div>
                <div className={getFullClassName()}>
                    <div className={getFullClassName('close')} onClick={onCancel}>
                        <Icon name="close"/>
                    </div>
                    <header className={getFullClassName('header')}>标题</header>
                    <main className={getFullClassName('main')}>
                        {props.children}
                    </main>
                    {
                        props.footer?
                        <footer className={getFullClassName('footer')}>
                        {props.buttons?props.buttons.map((button, index) => React.cloneElement(button,{key:index})):
                        [<button key="cancel" onClick={onCancel}>cancel</button>,<button key="ok" onClick={onOk}>ok</button>]}
                        </footer>:
                        ''
                    }   
                </div>
            </Fragment>:
                null
    )
    return ReactDOM.createPortal(x,document.body)
    
}

export const alert = (content:string) => {
    const buttons = <button onClick={()=>onCancel()}>OK</button>
    const onCancel = modal(content,[buttons])
}

export const confirm = (content:string,yes?:()=>void,no?:()=>void) => {
    const onYes = () => {
        onCancel()
        yes&&yes()
    }
    const onNo = () => {
        onCancel()
        no&&no()
    }
    const buttons = [
        <button onClick={onNo}>confirm no</button>,
        <button onClick={onYes}>confirm yes</button>
    ]
    const onCancel = modal(content,buttons)

}

export const modal = (content:ReactNode,buttons?:Array<ReactElement>) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const onCancel = () => {
        ReactDOM.render(React.cloneElement(component,{visiable:false}),div)
        ReactDOM.unmountComponentAtNode(div)
        div.remove()
    }
    const component = <Dialog 
    visiable={true}
    maskCloseable={true}
    buttons={buttons}
    onCancel={onCancel}
    >
        {content}
    </Dialog>
    ReactDOM.render(component,div)
    return onCancel
}



Dialog.defaultProps = {
    maskCloseable:false,
    footer:true
}

export default Dialog