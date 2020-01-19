import React, { Component } from "react";
import Home from './home'
import Work from './work'
import Form from './form'
import Header from './head'
import Income from './income'
import Receipt from './receipt'
import Employers from './employers'
import Users from './users'
import Admins from './admins'
import Pay from './pay'
import Basement from './basement'
import { Switch, Route, browserHistory } from 'react-router';
import '../styles/main.css';

class MainPage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div class="wrapper">
                <Header />
                <Switch history={ history }>
                <Route path='/home/receipt/:id' component={Pay}/>
                <Route 
                path='/home/users' 
                render={(props) => <Users {...props}/>}
                />
                <Route 
                path='/home/employers' 
                render={(props) => <Employers {...props}/>}
                />
                <Route 
                path='/home/income' 
                render={(props) => <Income {...props}/>}
                />
                <Route path='/home/admins' component={Admins}/>
                <Route path='/home/work' component={Work}/>
                <Route
                path='/home/receipt' 
                render={(props) => <Receipt {...props}/>}
                />
                <Route
                path='/home/form'
                render={(props) => <Form {...props}/>}
                />
                <Route exact path='/home' component={Home}/>
                </Switch>
                <Basement />
            </div>
        );
    }
}

export default MainPage;