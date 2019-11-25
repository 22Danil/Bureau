import React, { Component } from "react";
import axios from "axios";

class Work extends Component{
    constructor(props){
        super(props);
        this.state = {
            works: []
        };
        this.handle = this.handle.bind(this);
    }
    handle() {
        let JWT = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/getwork',{
            params: {
                token: JWT
            }
        })
            .then(response => {
                if (response.status == 200){
                    console.log(response);
                    this.setState({ works: response.data.works});
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
                {this.state.works.map((option, idx) =>
                        <div key={idx}>
                            {/* <option key={idx} value={option.id}>{option.name}</option> option.specialty_id*/}
                            Название: {option.title}
                            <br></br>
                            Адресс: {option.address}
                            <br></br>
                            Должность: {option.nameposition}
                            <br></br>
                            Специальность: {option.namespecialty}
                            <br></br>
                            Зарплата: {option.salary}
                            <br></br>
                            Дата: {option.dateadded}
                        </div>
                    )}
            </div>
        );
    }
}

export default Work;