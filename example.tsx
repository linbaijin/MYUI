
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import { Layout, Header, Content, Aside, Footer } from './lib/layout/layout'
import './example.scss'
void 'examples 不要改动这一行代码！'; // tslint:disable-line

ReactDOM.render(
    <div>
        <Router>
            <Layout style={{ border: '1px solid red' }}>
                <Header style={{ border: '1px solid green' }}>
                        <div className="logo">
                            MYUI
                        </div>
                </Header>
                <Layout>
                <Aside style={{ border: '1px solid black' }}>
                    <h2>组件</h2>
                    <ul>
                        <li>
                            <Link to="/dialog">dialog</Link>
                        </li>
                        <li>
                            <Link to="/layout">layout</Link>
                        </li>
                        <li>
                            <Link to=""></Link>
                        </li>
                    </ul>
            </Aside>
                   
                    <Content>
                        <Route path="/dialog" component={DialogExample}></Route>
                        <Route path="/layout" component={LayoutExample}></Route>
                    </Content>
                </Layout>
                <Footer style={{border:'1px solid blue'}}>@LeeBriken</Footer>
            </Layout>
        </Router>
    </div>
    , document.querySelector('#root'));

