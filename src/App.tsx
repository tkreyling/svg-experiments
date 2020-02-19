import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Editor} from "./Editor";
import {Architecture} from "./Architecture";

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