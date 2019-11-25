import React, { Component, useState  } from "react";
import axios from 'axios';
import '../styles/main.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom'
import {A, navigate, redirect} from "hookrouter";
import { Link } from 'react-router-dom'

const ToPost = withRouter(({ history, ID }) => (
    <Button variant="primary" onClick={() => { history.push(`/post/${ID}`) }}>Подробнее</Button>
));

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
        this.setState({role: rol});
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
                    alert("Вакансия добавлена");
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    componentWillMount(){
        this.handle();
    }
    render() {
        let main = null;
        if(this.state.role == "usual"){
            main = <div id="columns">
                        Что бы начать поиск работы вы должны заполнить <Link to='/home/form'> форму </Link> и внести предоплату в размере 200грн.
                   </div>;
        }
        else if(this.state.role == "worker"){
            main = <div id="columns">
                        <p>{this.state.name}, вы администратор!</p>
                        <br></br><br></br>
                        <select onChange={this.onChange} name="value_positions" value={this.state.value_positions}>
                            {this.state.positions.map((option, idx) =>
                                <option key={idx} value={option.id}>{option.name}</option>
                            )}
                        </select>
                        <br></br>
                        <select onChange={this.onChange} name="value_specialty" value={this.state.value_specialty}>
                            {this.state.specialty.map((option, idx) =>
                                <option key={idx} value={option.id}>{option.name}</option>
                            )}
                        </select>
                        <br></br>
                        <input name="title" placeholder="Название" value={this.state.title} onChange={this.onChange}></input><br></br>
                        <input name="address" placeholder="Адресс" value={this.state.address} onChange={this.onChange}></input><br></br>
                        <input name="number" placeholder="Номер телефона" value={this.state.number} onChange={this.onChange}></input><br></br>
                        <input name="salary" placeholder="Зарплата" value={this.state.salary} onChange={this.onChange}></input><br></br>
                        <button onClick={this.publish}>Добавить вакансию</button><br></br>
                   </div>;
        }
        else if(this.state.role == "admin"){
            main = <div id="columns">
                        <p>{this.state.name}, вы владелец сайта!</p>
                        <br></br><br></br>
                        <input name="newAdmin" placeholder="Логин" value={this.state.newAdmin} onChange={this.onChange}></input><br></br>
                        <button onClick={this.added}>Добавить администратора</button><br></br>
                   </div>;
        }
        return (
            <div>
                {main}
            </div>

        );
    }
}

export default content;