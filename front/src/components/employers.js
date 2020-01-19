import React, { Component } from "react";
import axios from "axios";
import '../styles/employers.css';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
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
      whiteColor: {
        color: "white"
      }
  };

class Employers extends Component{
    constructor(props){
        super(props);
        this.state = {
            employers: [],
            dataForEdit: {},
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
                url: 'http://127.0.0.1:8000/api/deleteemployer',
                data: {
                    id: id,
                    token: JWT,
                }
            })
            .then(response => {
                if (response.status == 200){
                    console.log("ok")
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    save(newData) {
        let title = newData.title
        let address = newData.address
        let number = newData.number
        let salary = newData.salary
        let id = newData.id
        let JWT = localStorage.getItem('token');
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/changeemployer',
                data: {
                    title: title,
                    address: address,
                    number: number,
                    salary: salary,
                    id: id,
                    token: JWT,
                }
            })
            .then(response => {
                if (response.status == 200){
                    console.log("ok")
                }
            })
            .catch(response => {
                console.log(response);
            })
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
                    console.log(response.data.employers);
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
                                    deleteText: 'Уверены что хотите удалить эту вакансию?'
                                }
                            }
                        }}
                        style={{
                            background: "#BDBDBD",
                        }}
                        title="Вакансии"
                        columns={[
                            { title: "Название", field: "title" },
                            { title: "Специальность", field: "specialty", editable: 'never'},
                            { title: "Должность", field: "position", editable: 'never'},
                            { title: "Адрес", field: "address"},
                            { title: "Номер", field: "number"},
                            { title: "Зарплата", field: "salary"},
                            { title: "Дата", field: "dateadded", editable: 'never'}
                        ]}
                        data={this.state.employers}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {   
                                            if(newData.salary != "" && newData.title != "" && newData.address != "" && newData.number != ""){
                                                if(Number.isInteger(Number(newData.number)) && Number.isInteger(Number(newData.salary))){
                                                    const data = this.state.employers;
                                                    const index = data.indexOf(oldData);
                                                    data[index] = newData;
                                                    this.setState({ data }, () => resolve());
                                                    this.save(newData);
                                                }
                                                else{
                                                    ToastsStore.warning("Поля 'Зарплата' и 'Номер' должны содержать только цифры!")
                                                }
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
                                            let data = this.state.employers;
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

export default withStyles(styles)(Employers);