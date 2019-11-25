import React, { Component } from "react";
import '../styles/start.css';
import axios from 'axios';
import {Link} from "react-router-dom";

class Start extends React.Component{
    constructor(props){
        super(props);
        this.state = {showElse: "main",
                      name: "",
                      login: "",
                      password: "",
                      passwordAgain: "",
                    };
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signInButton = this.signInButton.bind(this);
        this.signUpButton = this.signUpButton.bind(this);
        this.signUpMain = this.signUpMain.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    signInButton(){
        this.setState({showElse: "signIn"});
    }
    signUpButton(){
        this.setState({showElse: "signUp"});
    }
    signUpMain(){
        this.setState({showElse: "main"});
    }
    signIn(){
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/login',
            data: {
                login: this.state.login,
                password: this.state.password
            }
        })
            .then(response => {
                if (response.status == 200){
                    // console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    this.props.history.push('/home')
                }
                else if(response.status == 204){
                    console.log("Неверный пароль!");
                }
            })
            .catch(response => {
                console.log(response);
                console.log("Неверный пароль!");
            })
    }
    signUp(){
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/registration',
            data: {
                name: this.state.name,
                login: this.state.login,
                password: this.state.password
            }
          })
        .then(response => {
            // this.setState({test: response.data.data});
            // console.log(response.status);
            // console.log(response);
            if (response.status == 200){
                // console.log(response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                this.props.history.push('/home')
            }
        })
    }
    componentWillMount(){
        //this.handleClick();
    }
    render() {
        let test = null;
        if (this.state.showElse == "main") {
            test = <div id="info">
                    <p>
                        Bureau - поможет вам быстро и качественно найти работу.<br></br>
                        Регистрируйся что бы узнать больше.
                    </p>
                    <button onClick={this.signInButton}>Войти</button>
                    <button onClick={this.signUpButton}>Регистрация</button>
            </div>
          } else if (this.state.showElse == "signIn") {
            test = <div id="info">
                    <p>
                        Вход
                    </p>
                    <input name="login" placeholder="Логин" value={this.state.login} onChange={this.onChange}></input><br></br>
                    <input name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.onChange}></input><br></br>
                    <button onClick={this.signIn}>Войти</button><br></br>
                    <button onClick={this.signUpButton}>Регистрация</button>
                    <button onClick={this.signUpMain}>Главная</button>
            </div>
          } else if (this.state.showElse == "signUp") {
            test = <div id="info">
                    <p>
                        Регистрация
                    </p>
                    <input name="name" placeholder="Ваше имя" value={this.state.name} onChange={this.onChange}></input><br></br>
                    <input name="login" placeholder="Логин" value={this.state.login} onChange={this.onChange}></input><br></br>
                    <input name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.onChange}></input><br></br>
                    <input name="passwordAgain" type="password" placeholder="Пароль еще раз" value={this.state.passwordAgain} onChange={this.onChange}></input><br></br>
                    <button onClick={this.signUp}>Зарегистрироваться</button><br></br>
                    <button onClick={this.signInButton}>Вход</button>
                    <button onClick={this.signUpMain}>Главная</button>
            </div>
          }
        return (
           <div>
               {test}
           </div>
        );
    }
}

export default Start;