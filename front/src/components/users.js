import React, { Component } from "react";
import axios from "axios";
import '../styles/users.css';
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const styles = {
    but:{
        margin: 5
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
      root2: {
        // background: "grey",
        // marginBottom: "10px"
        
      },
      whiteColor: {
        color: "white"
      }
  };

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
        this.handle = this.handle.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }
    delete(oldData) {
        let id = oldData.id
        let JWT = localStorage.getItem('token');
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/deleteuser',
                data: {
                    id: id,
                    token: JWT,
                }
            })
            .then(response => {
                if (response.status == 200){
                    console.log("ok")
                    //this.setState({ employers: response.data.users});
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    save(newData) {
        let login = newData.login;
        let name = newData.name;
        let lastname = newData.lastname;
        let middlename = newData.middlename;
        let role = newData.role;
        let id = newData.id;
        let JWT = localStorage.getItem('token');
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/changeuser',
            data: {
                login: login,
                name: name,
                lastname: lastname,
                middlename: middlename,
                role: role,
                id: id,
                token: JWT,
                }
            })
            .then(response => {
                if (response.status == 200){
                    console.log("ok")
                    //this.setState({ employers: response.data.users});
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    handle() {
        let JWT = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/users',{
            params: {
                token: JWT
            }
        })
            .then(response => {
                if (response.status == 200){
                    this.setState({ users: response.data.users});
                    console.log(response.data.users);
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
        const { classes } = this.props;
        return (
            <div id="mainBlock">
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
                    <MaterialTable
                         localization={{
                            toolbar:{
                                searchPlaceholder: "Поиск"
                            },
                            header:{
                                actions: "Действия"
                            },
                            body: {
                                editRow: {
                                    deleteText: 'Уверены что хотите удалить этого пользователя?'
                                }
                            }
                        }}
                        style={{
                            background: "#BDBDBD",
                        }}
                        title="Пользователи"
                        columns={[
                            { title: "Логин", field: "login" },
                            { title: "Фамилия", field: "lastname"},
                            { title: "Имя", field: "name"},
                            { title: "Отчество", field: "middlename"},
                            { title: "Роль", field: "role"},
                            { title: "Дата", field: "dateadded", editable: 'never'}
                        ]}
                        data={this.state.users}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {   
                                            if(newData.login != "" && newData.lastname != "" && newData.name != "" && newData.middlename != "" && newData.role != ""){
                                                const data = this.state.users;
                                                const index = data.indexOf(oldData);
                                                data[index] = newData;
                                                this.setState({ data }, () => resolve());
                                                this.save(newData);
                                            }
                                            else{
                                                ToastsStore.warning("Ячейка не может быть пустой!")
                                            }
                                        }
                                        resolve()
                                    }, 1000)
                                }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            let data = this.state.users;
                                            const index = data.indexOf(oldData);
                                            data.splice(index, 1);
                                            this.setState({ data }, () => resolve());
                                            this.delete(oldData);
                                        }
                                        resolve()
                                    }, 1000);
                                }),
                        }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Users);