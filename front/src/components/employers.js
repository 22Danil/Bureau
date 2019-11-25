import React, { Component } from "react";
import axios from "axios";
//import '../styles/users.css';
import { withRouter, Link } from 'react-router-dom'

class Employers extends Component{
    constructor(props){
        super(props);
        this.state = {
            employers: []
        };
        this.handle = this.handle.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }
    delete() {
        console.log("s")
    }
    save() {
        console.log("s")
    }
    handle() {
        let JWT = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/employers',{
            params: {
                token: JWT
            }
        })
            .then(response => {
                if (response.status == 200){
                    this.setState({ employers: response.data.employers});
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
                <table>
                    <tbody>
                        {this.state.employers.map((option, idx) =>
                            <tr key={idx}>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.id}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.title}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.address}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.number}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.position}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.specialty}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.salary}></input>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Employers;