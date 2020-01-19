import React, { Component, useState } from "react";
import axios from "axios";
import '../styles/pay.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const styles = {
    but:{
        margin: 10
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

class Pay extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            card:"",
            cost:500,
        };
        this.onChange = this.onChange.bind(this);
        this.pay = this.pay.bind(this);
    }
    pay(){
        if(this.state.card != ""){
            let str = this.state.card;
            let result = str.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/g);
            if(!result){
                ToastsStore.warning("С номером карты что-то не так")
            }
            else{
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
                        this.props.history.push('/home/receipt')
                        ToastsStore.success("Оплата прошла успешно! Перейдите в раздел 'Работа' для более подробной информации!")
                    }
                })
                }
        }
        else{
            ToastsStore.warning("Проверьте все ли поля заполнены")
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentWillMount(){
        this.setState({id: this.props.match.params.id});
    }
    render() {
        const { classes } = this.props;
        return (
            <div id="mainBlock">
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
                <div id="centrtwo">
                    <p id="test">
                        Оплата
                    </p>
                    <ValidatorForm
                            ref="form"
                            onSubmit={this.pay}
                        >
                        <TextField
                            required
                            disabled
                            label="Комиссионные"
                            name="cost"
                            onChange={this.onChange}
                            defaultValue={this.state.cost} 
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
                            label="Номер карты"
                            name="card"
                            onChange={this.onChange}
                            value={this.state.card}
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
                            <Button type="submit" style={styles.but} variant="contained" color="primary">Оплатить</Button>
                    </ValidatorForm>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Pay);
