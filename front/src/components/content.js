import React, { Component, useState  } from "react";
import axios from 'axios';
import '../styles/main.css';
import { withRouter } from 'react-router-dom'
import {A, navigate, redirect} from "hookrouter";
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    but:{
        margin: 5,
        marginLeft: 10,
        width:200,
        textTransform: "none",
    },
    root: {
        marginLeft:10,
        width:200,
      },
      input: {
        color: "white",
      },
      lab: {
        color: "white",
      },
      selectEmpty:{
          width:200,
          marginLeft:10,
      },
      whiteColor: {
        color: "white"
      }
  };

class content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            role: "",
            positions: [],
            specialty: [],
            value_positions: "-",
            value_specialty: "-",
            name: "",
            title: "",
            address: "",
            number: "",
            salary: "",
            newAdmin: ""
        };
        this.handle = this.handle.bind(this);
        this.publish = this.publish.bind(this);
        this.added = this.added.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    added() {
        console.log("a")
    }
    handle(){
        let rol = localStorage.getItem('role');
        let name = localStorage.getItem('name');
        this.setState({role: rol});
        this.setState({name: name});
        if(rol == "worker" || rol == "admin"){
            let JWT = localStorage.getItem('token');
            axios.get('http://127.0.0.1:8000/api/formdata',{
                params: {
                    token: JWT
                }
            })
                .then(response => {
                    if (response.status == 200){
                        console.log(response);
                        this.setState({ positions: response.data.positions});
                        this.setState({ specialty: response.data.specialty});
                        this.setState({ name: response.data.name});
                    }
                })
                .catch(response => {
                    console.log(response);
                })
        }
        else if(rol == "admin"){
            console.log("s");
        }
    
    }
    publish() {
        if(this.state.value_positions != "-" && this.state.value_specialty != "-" && this.state.salary != "" && this.state.title != "" && this.state.address != "" && this.state.number != ""){
            if(Number.isInteger(Number(this.state.number)) && Number.isInteger(Number(this.state.salary))){
                let JWT = localStorage.getItem('token');
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/make',
                    data: {
                        value_positions: this.state.value_positions,
                        value_specialty: this.state.value_specialty,
                        title: this.state.title,
                        address: this.state.address,
                        number: this.state.number,
                        salary: this.state.salary,
                        token: JWT,
                    }
                })
                    .then(response => {
                        if (response.status == 200){
                            ToastsStore.success("Вакансия добавлена")
                            this.setState({title: ""});
                            this.setState({address: ""});
                            this.setState({number: ""});
                            this.setState({salary: ""});
                            this.setState({value_positions: "-"});
                            this.setState({value_specialty: "-"});
                        }
                    })
                    .catch(response => {
                        console.log(response);
                    })
            }
            else{
                ToastsStore.warning("Поля 'Зарплата' и 'Номер' должны содержать только цифры!")
            }
        }
        else{
            ToastsStore.warning("Проверьте все ли поля заполнены")
        }
    }
    componentWillMount(){
        let tok = localStorage.getItem('token');
        let rol = localStorage.getItem('role');
        if(!tok && !rol){
            this.props.history.push("/");
        }
        else{
            this.handle();
        }
    }
    render() {
        const { classes } = this.props;
        let main = null;
        if(this.state.role == "usual"){
            main = <div >
                        <p align="center">Добро пожаловать {this.state.name}</p>
                        <p align="justify">
                            Для того чтобы стать на учет по поиску работы, вам требуеться
                            заполнить <Link to='/home/form'> форму</Link>, в которой нужно указать желаемую должность,
                            зарплату и вашу специальность. Также требуеться внести предоплату в размере 200грн. 
                        </p>
                        <p align="justify">
                            В разделе "Квитанции" вы можете посмотреть ваши заявки на поиск работы, а так же
                            оплатить найденные.
                        </p>
                        <p align="justify">
                            В разделе "Работа" вы можете посмотреть найденные для вас вакансии.
                        </p>
                   </div>;
        }
        else if(this.state.role == "worker"){
            main = <div>
                <div id="centr">
                    <p id="test">
                        Добавление вакансии
                    </p>
                    <ValidatorForm
                            ref="form"
                            onSubmit={this.publish}
                        >
                        <FormControl variant="outlined" className={classes.selectEmpty}>
                            <InputLabel id="demo-simple-select-outlined-label">
                            Специальность
                            </InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={this.onChange} 
                            name="value_specialty" 
                            value={this.state.value_specialty}
                            labelWidth={115}
                            classes={{
                                root: classes.whiteColor,
                                icon: classes.whiteColor,
                            }}
                            >
                            {this.state.specialty.map((option, idx) =>
                                <MenuItem key={idx} value={option.id}>{option.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                        
                        <FormControl variant="outlined" className={classes.selectEmpty}>
                            <InputLabel id="demo-simple-select-outlined-label">
                            Должность
                            </InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={this.onChange} 
                            name="value_positions" 
                            value={this.state.value_positions}
                            labelWidth={80}
                            classes={{
                                root: classes.whiteColor,
                                icon: classes.whiteColor,
                            }}
                            >
                            {this.state.positions.map((option, idx) =>
                                <MenuItem key={idx} value={option.id}>{option.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                        <br></br>
                        <TextField
                            required
                            label="Название"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title} 
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
                        <TextField
                            required
                            label="Адрес"
                            name="address"
                            onChange={this.onChange}
                            value={this.state.address} 
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
                        <br></br>
                        <TextField
                            required
                            label="Номер"
                            name="number"
                            onChange={this.onChange}
                            value={this.state.number} 
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
                        <TextField
                            required
                            label="Зарплата"
                            name="salary"
                            onChange={this.onChange}
                            value={this.state.salary} 
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
                        <br></br>
                        <Button type="submit" style={styles.but} variant="contained" color="primary">Создать вакансию</Button>
                        </ValidatorForm>
                    </div>
                   </div>;
        }
        else if(this.state.role == "admin"){
            main = <div >
                        <p align="center">Добро пожаловать {this.state.name}, вы владелец сайта!</p>
                        <p align="justify">
                            В этом меню вы можете управлять пользователями этого сайта. 
                        </p>
                        <p align="justify">
                            В разделе "Администраторы" вы можете изменить информацию об администраторе или же 
                            лишить прав администратора.
                        </p>
                        <p align="justify">
                            В разделе "Пользователи" вы можете изменить информацию об пользователе или же 
                            дать права администратора.
                        </p>
                   </div>;
        }
        return (
            <div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
                {main}
            </div>

        );
    }
}

export default withStyles(styles)(content);