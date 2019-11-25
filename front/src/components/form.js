import React, { Component } from "react";
import axios from "axios";
//import '../styles/users.css';


class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            positions: [],
            specialty: [],
            value_positions: "-",
            value_specialty: "-",
            name: "",
            EstimatedSalary: 0,
            prepayment: 200,
            card: "",
        };
        this.handle = this.handle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.publish = this.publish.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    publish() {
        let JWT = localStorage.getItem('token');
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/publish',
            data: {
                value_positions: this.state.value_positions,
                value_specialty: this.state.value_specialty,
                EstimatedSalary: this.state.EstimatedSalary,
                prepayment: this.state.prepayment,
                token: JWT,
            }
        })
            .then(response => {
                if (response.status == 200){
                    if (response.data.text == "forForm"){
                        alert("Ваша квитанция оформлена, перейдите в 'Мои квитанции' что бы узнать больше");
                        this.props.history.push('/home');
                    }
                    // console.log(response);
                    /*localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    this.props.history.push('/home')*/
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    handle() {
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
                    /*localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    this.props.history.push('/home')*/
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
        return (
            <div>
                <input name="name" placeholder="Имя" value={this.state.name} onChange={this.onChange}></input><br></br>
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
                <input name="EstimatedSalary" placeholder="Ожидаемая зарплата" value={this.state.EstimatedSalary} onChange={this.onChange}></input><br></br>
                <input name="prepayment" placeholder="Предоплата" value={this.state.prepayment} onChange={this.onChange}></input><br></br>
                <input name="card" placeholder="Номер карты" value={this.state.card} onChange={this.onChange}></input><br></br>
                <button onClick={this.publish}>Оформить квитанцию</button><br></br>
            </div>
        );
    }
}

export default Form;