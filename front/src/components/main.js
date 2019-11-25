import React from 'react'
import { Switch, Route } from 'react-router';
import MainPage from './mainPage'
import Start from './start'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Start}/>
            <Route path='/home' component={MainPage}/>
        </Switch>
    </main>
);

export default Main