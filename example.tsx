
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink} from 'react-router-dom';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import IconExample from './lib/icon/icon.demo';
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
                        
                    </ul>
            </Aside>
                   
                    <Content className="site-main">
                        <Route path="/icon" component={IconExample}></Route>
                        <Route path="/dialog" component={DialogExample}></Route>
                        <Route path="/layout" component={LayoutExample}></Route>
                    </Content>
                </Layout>
                <Footer className="site-footer">@LeeBriken</Footer>
            </Layout>
        </Router>
    </div>
    , document.querySelector('#root'));

