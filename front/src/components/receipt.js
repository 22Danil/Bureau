import React, { Component } from "react";
import axios from "axios";
//import '../styles/users.css';
import { withRouter, Link } from 'react-router-dom'

class Receipt extends Component{
    constructor(props){
        super(props);
        this.state = {
            reseipts: []
        };
        this.handle = this.handle.bind(this);
        this.pay = this.pay.bind(this);
        this.search = this.search.bind(this);
    }
    pay(id) {
        const { history } = this.props;
        history.push(`/home/receipt/${id}`);
    }
    search(specialty_id, position_id, estimated_salary, id) {
        let JWT = localStorage.getItem('token');
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/search',
            data: {
                value_positions: position_id,
                value_specialty: specialty_id,
                EstimatedSalary: estimated_salary,
                receipt_id: id,
                token: JWT,
            }
        })
            .then(response => {
                if (response.status == 200){
                    if(response.data.text == "notfound"){
                        alert("Ничего не найдено, попробуйте позже")
                    }
                    else{
                        this.setState({ reseipts: response.data.reseipts});
                    }
                    
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    handle() {
        let JWT = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/getreceipt',{
            params: {
                token: JWT
            }
        })
            .then(response => {
                if (response.status == 200){
                    console.log(response);
                    this.setState({ reseipts: response.data.reseipts});
                    /*localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    this.props.history.push('/home')*/
                }
            })
            .catch(response => {
                console.log(response);
                this.props.history.push('/')
            })
    }
    componentWillMount(){
        this.handle();
    }
    render() {
        return (
            <div>
                {this.state.reseipts.map((option, idx) =>
                        <div key={idx}>
                            {/* <option key={idx} value={option.id}>{option.name}</option> option.specialty_id*/}
                            Номер квитанции: {option.id}
                            <br></br>
                            Специальность: {option.namespecialty}
                            <br></br>
                            Должность: {option.nameposition}
                            <br></br>
                            Ожидаемая зарплата: {option.estimated_salary}
                            <br></br>
                            Дата: {option.dateadded}
                            <br></br>
                            {option.employer_id ? <button onClick={() => { this.pay(option.id) }}>Оплата</button> : <button onClick={() => { this.search(option.specialty_id, option.position_id,option.estimated_salary,option.id) }}>Искать</button>}
                        </div>
                    )}
            </div>
        );
    }
}

export default Receipt;