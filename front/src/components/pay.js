import React, { Component, useState } from "react";
import axios from "axios";

class Pay extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            card:"",
            cost:"",
        };
        this.onChange = this.onChange.bind(this);
        this.pay = this.pay.bind(this);
    }
    pay(){
        let JWT = localStorage.getItem('token');
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/pay',
            data: {
                id: this.state.id,
                card: this.state.card,
                cost: this.state.cost,
                token: JWT
            }
          })
        .then(response => {
            if (response.status == 200){
                console.log(response);
                this.props.history.push('/home/receipt')
            }
        })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentWillMount(){
        console.log(this.props.match.params.id);
        this.setState({id: this.props.match.params.id});
    }
    render() {
        return (
            <div>
                {this.state.id}
                <input name="card" placeholder="Номер карты" value={this.state.card} onChange={this.onChange}></input><br></br>
                <input name="cost" placeholder="Комиссионные" value={this.state.cost} onChange={this.onChange}></input>
                <button onClick={this.pay}>Оплатить</button>
                {/* <h2>{this.state.id} Post {this.props.match.params.id}</h2>
                <Link to={`/`}>back</Link> */}
            </div>
        );
    }
}

export default Pay;
