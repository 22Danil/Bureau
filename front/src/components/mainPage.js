import React, { Component } from "react";
import Home from './home'
import Work from './work'
import Form from './form'
import Header from './head'
import Receipt from './receipt'
import Employers from './employers'
import Users from './users'
import Admins from './admins'
import Pay from './pay'
import { Switch, Route, browserHistory } from 'react-router';

class MainPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Switch history={ history }>
                <Route path='/home/receipt/:id' component={Pay}/>
                <Route path='/home/users' component={Users}/>
                <Route path='/home/employers' component={Employers}/>
                <Route path='/home/admins' component={Admins}/>
                <Route path='/home/work' component={Work}/>
                <Route path='/home/receipt' component={Receipt}/>
                <Route path='/home/form' component={Form}/>
                <Route exact path='/home' component={Home}/>
                    {/* <Route exact path='/home' component={Home}/>
                    <Route path='/home/form' component={Form}/>
                    <Route path='/home/receipt' component={Receipt}/>
                    <Route path='/home/receipt/:id' component={Pay}/> */}
                </Switch>
            </div>
        );
    }
}

export default MainPage;