import React, { Component } from "react";
import '../styles/head.css';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import logo from '../images/logo.png';
import Button from '@material-ui/core/Button';
import {ToastsContainer, ToastsStore} from 'react-toasts';


const styles = {
    but:{
        // margin: 5
        textTransform: "none",
        fontSize: 18,
        float:"left",
        marginTop:30,
        marginLeft:70
    },
    but3:{
        // margin: 5
        textTransform: "none",
        fontSize: 18,
        float:"left",
        marginTop:30,
        marginLeft:20
    },
    butOne:{
        float:"right",
        textTransform: "none",
        fontSize: 18,
        marginTop:30,
        marginRight:10,
    }
  };
class Head extends React.Component{
    constructor(props){
        super(props);
        this.state = {role: ""};
        this.handleClick = this.handleClick.bind(this);
        this.onLink = this.onLink.bind(this);
    }
    onLink(e) {
        this.props.history.push(e);
    }
    handleClick(){
        let rol = localStorage.getItem('role');
        this.setState({role: rol});
    }
    componentWillMount(){
        this.handleClick();
    }
    render() {
        let menu = null;
        if(this.state.role == "usual"){
            menu = <div >
                    <Button style={styles.but} color="primary" onClick={() => { this.onLink("/home") }}>Главная</Button>
                    <Button style={styles.but} color="primary" onClick={() => { this.onLink("/home/receipt") }}>Квитанции</Button>
                    <Button style={styles.but} color="primary" onClick={() => { this.onLink("/home/work") }}>Работа</Button>
                    <h5 id="test">Bureau - бюро трудоустройств</h5>
                    <Button style={styles.butOne} color="primary" onClick={() => { this.onLink("/")}}>Выход</Button>
            </div>;
        }
        else if(this.state.role == "worker"){
            menu = <div>
                    <Button style={styles.but} color="primary" onClick={() => { this.onLink("/home") }}>Главная</Button>
                    <Button style={styles.but} color="primary" onClick={() => { this.onLink("/home/employers") }}>Вакансии</Button>
                    <Button style={styles.but} color="primary" onClick={() => { this.onLink("/home/users") }}>Пользователи</Button>
                    <h5 id="test">Bureau - бюро трудоустройств</h5>
                    <Button style={styles.butOne} color="primary" onClick={() => { this.onLink("/") }}>Выход</Button>
            </div>;
        }
        else if(this.state.role == "admin"){
            menu = <div>
                    <Button style={styles.but3} color="primary" onClick={() => { this.onLink("/home") }}>Главная</Button>
                    <Button style={styles.but3} color="primary" onClick={() => { this.onLink("/home/admins") }}>Администраторы</Button>
                    <Button style={styles.but3} color="primary" onClick={() => { this.onLink("/home/users") }}>Пользователи</Button>
                    <Button style={styles.but3} color="primary" onClick={() => { this.onLink("/home/income") }}>Доход</Button>
                    <h5 id="test">Bureau - бюро трудоустройств</h5>
                    <Button style={styles.butOne}  color="primary" onClick={() => { this.onLink("/") }}>Выход</Button>
            </div>;
        }
        return (
            <div id="headMenu">
                <div id="logo">
                    <img src={logo} height={100} alt="Logo" />
                </div>
                {menu}
            </div>
        );
    }
}

export default withRouter(Head);
