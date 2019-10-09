
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink} from 'react-router-dom';
import DialogDemo from './lib/dialog/dialog.demo';
import LayoutDemo from './lib/layout/layout.demo';
import IconDemo from './lib/icon/icon.demo';
import FormDemo from './lib/form/form.demo';
import ScrollExample from './lib/scroll/scrollExample';
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout'
import './example.scss'
void 'examples 不要改动这一行代码！'; // tslint:disable-line


ReactDOM.render(
    <div>
        <Router>
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
                        <li>
                            <NavLink to="/icon">icon</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialog">dialog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/layout">layout</NavLink>
                        </li>
                        <li>
                            <NavLink to="/form">表单</NavLink>
                        </li>
                        <li>
                            <NavLink to="/scroll">滚动条</NavLink>
                        </li>
                    </ul>
            </Aside>
                   
                    <Content className="site-main">
                        <Route path="/icon" component={IconDemo}></Route>
                        <Route path="/dialog" component={DialogDemo}></Route>
                        <Route path="/layout" component={LayoutDemo}></Route>
                        <Route path="/form" component={FormDemo}></Route>
                        <Route path="/scroll" component={ScrollExample}></Route>
                    </Content>
                </Layout>
                <Footer className="site-footer">@LeeBriken</Footer>
            </Layout>
        </Router>
    </div>
    , document.querySelector('#root'));

