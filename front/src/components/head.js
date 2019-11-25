import React, { Component } from "react";
import '../styles/head.css';
import { Link } from 'react-router-dom'
import logo from '../images/logo.png';

class Head extends Component{
    constructor(props){
        super(props);
        this.state = {role: ""};
        this.handleClick = this.handleClick.bind(this);
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
            menu = <div className="App" id="nav">
                    <h5><Link to='/home'>Главная</Link></h5>
                    <h5><Link to='/home/receipt'>Квитанции</Link></h5>
                    <h5><Link to='/home/work'>Работа</Link></h5>
                    <h5><Link to='/'>Выход</Link></h5>
            </div>;
        }
        else if(this.state.role == "worker"){
            menu = <div className="App" id="nav">
                    <h5><Link to='/home'>Главная</Link></h5>
                    <h5><Link to='/home/employers'>Вакансии</Link></h5>
                    <h5><Link to='/home/users'>Пользователи</Link></h5>
                    <h5><Link to='/'>Выход</Link></h5>
            </div>;
        }
        else if(this.state.role == "admin"){
            menu = <div className="App" id="nav">
                    <h5><Link to='/home'>Главная</Link></h5>
                    <h5><Link to='/home/admins'>Администраторы</Link></h5>
                    <h5><Link to='/home/users'>Пользователи</Link></h5>
                    <h5><Link to='/'>Выход</Link></h5>
            </div>;
        }
        return (
            <div id="headMenu">
                <div id="logo">
                    <img src={logo} height={100} alt="Logo" />
                </div>
                {menu}
                {/* <div className="App" id="nav">
                    <h5><Link to='/'>Home</Link></h5>
                    <h5><Link to='/home/users'>Users</Link></h5>
                    <h5><Link to='/popular'>Popular</Link></h5>
                </div> */}
            </div>
        );
    }
}

export default Head;
