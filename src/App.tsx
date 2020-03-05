import React from 'react';
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Editor} from "./v1/Editor";
import {Architecture} from "./v1/Architecture";
import {Sample} from "./v2/Sample";
import {NewArchitecture} from "./v2/NewArchitecture";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Editor</Link>
                    </li>
                    <li>
                        <Link to="/architecture">Sample Architecture</Link>
                    </li>
                    <li>
                        <Link to="/new-layouting">New Layouting</Link>
                    </li>
                    <li>
                        <Link to="/new-architecture">New Sample Architecture</Link>
                    </li>
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        <Editor/>
                    </Route>
                    <Route path="/architecture">
                        <Architecture/>
                    </Route>
                    <Route path="/new-layouting">
                        <Sample/>
                    </Route>
                    <Route path="/new-architecture">
                        <NewArchitecture/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;