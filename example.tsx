
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import DialogExample from './lib/dialog/dialog.example'

void 'examples 不要改动这一行代码！'; // tslint:disable-line

ReactDOM.render(
  <div>
    <Router>
        <header>
            <div className="logo">
                MYUI
            </div>
        </header>
        <aside>
            <h2>组件</h2>
            <ul>
                <li>
                    <Link to="/dialog">dialog</Link>
                </li>
                <li>
                    <Link to=""></Link>
                </li>
                <li>
                    <Link to=""></Link>
                </li>
            </ul>
        </aside>
        <main>
            <Route path="/dialog" component={DialogExample}></Route>
            {/* <Route path=""></Route> */}
        </main>
    </Router>
  </div>
  , document.querySelector('#root'));

