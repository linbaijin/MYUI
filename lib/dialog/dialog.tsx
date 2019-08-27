import React,{Fragment} from 'react'
import './dialog.scss'
import {Icon} from '../index'
import {getFirstClassName} from '../classes'
interface Props {
    visiable:boolean
}

const Dialog:React.FunctionComponent<Props> = (props) => {

    const getFullClassName = getFirstClassName('myui-dialog')

    return(
            props.visiable?
            <Fragment>
                <div className={getFullClassName('mask')}>
                </div>
                <div className={getFullClassName()}>
                    <div className={getFullClassName('close')}>
                        <Icon name="close"/>
                    </div>
                    <header className={getFullClassName('header')}>标题</header>
                    <main className={getFullClassName('main')}>
                        内容
                    </main>
                    <footer className={getFullClassName('footer')}>
                        <button>cancle</button>
                        <button>ok</button>
                    </footer>
                </div>
            </Fragment>:
                null
    )
    
}

export default Dialog