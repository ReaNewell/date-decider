import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Dashboard from '../components/Dashboard';

const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={Dashboard} exact={true}/>
            </Switch>
        </div>
    </Router>
);

export default (AppRouter);