
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink} from 'react-router-dom';
import DialogDemo from './lib/dialog/dialog.demo';
import LayoutDemo from './lib/layout/layout.demo';
import IconDemo from './lib/icon/icon.demo';
import FormDemo from './lib/form/form.demo';
import ScrollDemo from './lib/scroll/scroll.demo';
import CitySelector from './lib/citySelector/citySelector.example';
import CascaderDemo from "./lib/cascader/cascaderDemo";
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout';
import './example.scss';
//import {useState} from "react";
import {RouteComponentProps} from "react-router";
import {useState} from "react";

void 'examples 不要改动这一行代码！'; // tslint:disable-line


interface Component {
    path:string,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const componentArr:Component[] = [
    {
        path:'icon',
        component:IconDemo
    },
    {
        path:'dialog',
        component:DialogDemo
    },
    {
        path:'layout',
        component:LayoutDemo
    },
    {
        path:'form',
        component:FormDemo
    },
    {
        path:'scroll',
        component:ScrollDemo
    },
    {
        path:'citySelector',
        component:CitySelector
    },
    {
        path:'cascader',
        component:CascaderDemo
    },
]


const IndexPage:React.FC = (props) => {
    const [currentUrl,setCurrentUrl] = useState<string>('')
    return (
        <div>
                <Layout className="site-page">
                    <Header className="site-header">
                        <div className="logo">
                            MYUI
                        </div>
                    </Header>
                    <Layout>
                        <Aside className="site-aside">
                            <h2>组件</h2>
                            <ul>
                                {
                                    componentArr.map((component)=>{
                                        return <li key={component.path} onClick={()=>setCurrentUrl(component.path)}>
                                            <NavLink to={`/${component.path}`}>{component.path}</NavLink>
                                            {
                                                // currentUrl===component.path&&
                                                <div
                                                    className="myui-menuItem-filler"
                                                    style={{
                                                        height:currentUrl===component.path?"100%":"0",
                                                        top:0,
                                                        transition:"all 350ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s",
                                                        //display:currentUrl===component.path?'block':"none",
                                                        opacity:currentUrl===component.path? 1 : 0
                                                    }}
                                                ></div>
                                            }
                                        </li>
                                    })
                                }
                            </ul>
                        </Aside>

                        <Content className="site-main">
                            {
                                componentArr.map((component)=>{
                                    return <Route key={component.path} path={`/${component.path}`} component={component.component}></Route>
                                })
                            }
                        </Content>
                    </Layout>
                    <Footer className="site-footer">@LeeBriken</Footer>
                </Layout>
        </div>
    )
}


ReactDOM.render(
    <Router>
        <IndexPage/>
    </Router>
    , document.querySelector('#root'));

