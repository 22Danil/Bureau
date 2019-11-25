import React, { Component } from "react";
import axios from "axios";
//import '../styles/users.css';
import { withRouter, Link } from 'react-router-dom'

class Admins extends Component{
    constructor(props){
        super(props);
        this.state = {
            admins: []
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
        axios.get('http://127.0.0.1:8000/api/admins',{
            params: {
                token: JWT
            }
        })
            .then(response => {
                if (response.status == 200){
                    this.setState({ admins: response.data.admins});
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
                        {this.state.admins.map((option, idx) =>
                            <tr key={idx}>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.id}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.name}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.login}></input>
                                </td>
                                <td>
                                    <input name="title" placeholder="Имя" value={option.dateadded}></input>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Admins;