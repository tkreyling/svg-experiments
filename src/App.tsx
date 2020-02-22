import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Editor} from "./v1/Editor";
import {Architecture} from "./v1/Architecture";

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
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        <Editor/>
                    </Route>
                    <Route path="/architecture">
                        <Architecture/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;