import React, { Component } from "react";
import '../styles/start.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const styles = {
    but:{
        margin: 5
    },
    root: {
        margin: 5
      },
      input: {
        color: "white",
      },
      lab: {
        color: "white",
      },
  };
class Start extends React.Component{
    constructor(props){
        super(props);
        this.state = {showElse: "main",
                      name: "",
                      lastName: "",
                      midleName: "",
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
        if(this.state.login != "" && this.state.password != ""){
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/login',
                data: {
                    login: this.state.login,
                    password: this.state.password
                }
            })
                .then(response => {
                    // console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('name', response.data.name);
                    this.props.history.push('/home')
                })
                .catch(response => {
                    ToastsStore.error("Неверный логин или пароль!")
                    //ToastsStore.success("Неверный логин или пароль!")
                    //ToastsStore.info("Неверный логин или пароль!")
                    //ToastsStore.warning("Неверный логин или пароль!")
                })
        }
    }
    signUp(){
        if(this.state.name != "" && this.state.lastName != "" && this.state.midleName != "" && this.state.login != "" && this.state.password != "" && this.state.passwordAgain != ""){
            if(this.state.password == this.state.passwordAgain){
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/registration',
                    data: {
                        name: this.state.name,
                        lastname: this.state.lastName,
                        midlename: this.state.midleName,
                        login: this.state.login,
                        password: this.state.password
                    }
                  })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('name', response.data.name);
                    this.props.history.push('/home')
                })
                .catch(response => {
                    ToastsStore.warning("Такой логин уже занят!")
                    //ToastsStore.error("Неверный логин или пароль!")
                    //ToastsStore.success("Неверный логин или пароль!")
                    //ToastsStore.info("Неверный логин или пароль!")
                })
            }
        }
    }
    componentWillMount(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
    render() {
        const { classes } = this.props;
        let test = null;
        if (this.state.showElse == "main") {
            test = <div id="main">
                    <p>
                        Bureau - поможет вам быстро и качественно найти работу.<br></br>
                        Регистрируйся что бы узнать больше.
                    </p>
                    <Button style={styles.but} variant="contained" color="primary" onClick={this.signInButton} >Вход</Button>
                    <Button  style={styles.but} variant="contained" color="primary" onClick={this.signUpButton}>Регистрация</Button>
            </div>
          } else if (this.state.showElse == "signIn") {
            test = <div id="signin">
                    <p align="center">
                        Вход
                    </p>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.signIn}
                    >
                    <TextField
                        required
                        label="Логин"
                        name="login"
                        onChange={this.onChange}
                        defaultValue={this.state.login} 
                        validators={['required']}
                        errormessages={['this field is required']}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextValidator
                        required
                        label="Пароль"
                        onChange={this.onChange}
                        name="password"
                        type="password"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={this.state.password}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <br></br>
                    <Button type="submit" style={styles.but} variant="contained" color="primary">Войти</Button>
                    <Button style={styles.but} variant="contained" color="primary" onClick={this.signUpMain}>Главная</Button>
                    {/* <button onClick={this.signIn}>Войти</button><br></br> onClick={this.signIn}*/}
                    </ValidatorForm>
                    
                    {/* <input name="login" placeholder="Логин" value={this.state.login} onChange={this.onChange}></input><br></br>
                    <input name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.onChange}></input><br></br>
                    <button onClick={this.signIn}>Войти</button><br></br>
                    <button onClick={this.signUpButton}>Регистрация</button>
                    <button onClick={this.signUpMain}>Главная</button> */}
                    
            </div>
          } else if (this.state.showElse == "signUp") {
            test = <div id="signup">
                    <p align="center">
                        Регистрация
                    </p>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.signUp}
                    >
                        <TextField
                        required
                        label="Имя"
                        name="name"
                        onChange={this.onChange}
                        defaultValue={this.state.name} 
                        validators={['required']}
                        errormessages={['this field is required']}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextValidator
                        required
                        label="Фамилия"
                        onChange={this.onChange}
                        name="lastName"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={this.state.lastName}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextValidator
                        required
                        label="Отчество"
                        onChange={this.onChange}
                        name="midleName"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={this.state.midleName}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <br></br>
                    <TextField
                        required
                        label="Логин"
                        name="login"
                        onChange={this.onChange}
                        defaultValue={this.state.login} 
                        validators={['required']}
                        errormessages={['this field is required']}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextValidator
                        required
                        label="Пароль"
                        onChange={this.onChange}
                        name="password"
                        type="password"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={this.state.password}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextValidator
                        required
                        label="Повторите пароль"
                        onChange={this.onChange}
                        name="passwordAgain"
                        type="password"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['password mismatch', 'this field is required']}
                        value={this.state.passwordAgain}
                        className={classes.root}
                        InputProps={{
                        className: classes.input,
                        }}
                        InputLabelProps={{
                            className: classes.lab,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <br></br>
                    <Button type="submit" style={styles.but} variant="contained" color="primary">Зарегистрироваться</Button>
                    <Button style={styles.but} variant="contained" color="primary" onClick={this.signUpMain}>Главная</Button>
                    {/* <button onClick={this.signUp}>Войти</button><br></br> */}
                    </ValidatorForm>
                    {/* <input name="name" placeholder="Ваше имя" value={this.state.name} onChange={this.onChange}></input><br></br>
                    <input name="login" placeholder="Логин" value={this.state.login} onChange={this.onChange}></input><br></br>
                    <input name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.onChange}></input><br></br>
                    <input name="passwordAgain" type="password" placeholder="Пароль еще раз" value={this.state.passwordAgain} onChange={this.onChange}></input><br></br>
                    <button onClick={this.signUp}>Зарегистрироваться</button><br></br>
                    <button onClick={this.signInButton}>Вход</button>
                    <button onClick={this.signUpMain}>Главная</button> */}
            </div>
          }
        return (
           <div>
               <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
               {test}
           </div>
        );
    }
}

export default withStyles(styles)(Start);