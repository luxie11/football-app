import React, { Fragment } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from './history';
import Sidebar from './Sidebar/Sidebar';

//Pages
import Home from './Pages/Home';
import Leagues from './Pages/Leagues'
import Club from './Pages/Club';
import HeadToHead from './Pages/HeadToHead';


const App = () =>{
    return(
        <Fragment>
            <Router history={createBrowserHistory}>
                <Sidebar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/leagues/:name" exact component={Leagues} />
                    <Route path="/leagues/:name/:club" exact component={Club} />
                    <Route path="/leagues/:name/:club" exact component={HeadToHead} />
                </Switch>
            </Router>
        </Fragment>
    )
}

export default App;

