import React, { Component } from "react";
import axios from "axios";
import '../styles/form.css';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            positions: [],
            specialty: [],
            value_positions: "-",
            value_specialty: "-",
            name: "",
            EstimatedSalary: "",
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
        if(this.state.value_positions != "-" && this.state.value_specialty != "-" && this.state.EstimatedSalary != "" && this.state.card != ""){
            let str = this.state.card;
            let result = str.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/g);
            if(!result){
                ToastsStore.warning("С номером карты что-то не так")
            }
            else{
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
                                this.setState({card: ""});
                                this.setState({EstimatedSalary: ""});
                                this.setState({value_positions: "-"});
                                this.setState({value_specialty: "-"});
                                this.props.history.push('/home');
                                ToastsStore.success("Заявка оформлена, перейдите в раздел 'Квитанции' для более подробной информации!")
                            }
                        }
                    })
                    .catch(response => {
                        console.log(response);
                    })
            }
        }
        else{
            ToastsStore.warning("Проверьте все ли поля заполнены")
        }
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
                <div id="centr">
                    <p id="test">
                        Заявка для поиска работы
                    </p>
                    <ValidatorForm
                            ref="form"
                            onSubmit={this.publish}
                        >
                        <FormControl variant="outlined" className={classes.selectEmpty}>
                            <InputLabel id="demo-simple-select-outlined-label">
                            Специальность
                            </InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={this.onChange} 
                            name="value_specialty" 
                            value={this.state.value_specialty}
                            labelWidth={115}
                            classes={{
                                root: classes.whiteColor,
                                icon: classes.whiteColor,
                            }}
                            >
                            {this.state.specialty.map((option, idx) =>
                                <MenuItem key={idx} value={option.id}>{option.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                        
                        <FormControl variant="outlined" className={classes.selectEmpty}>
                            <InputLabel id="demo-simple-select-outlined-label">
                            Должность
                            </InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={this.onChange} 
                            name="value_positions" 
                            value={this.state.value_positions}
                            labelWidth={80}
                            classes={{
                                root: classes.whiteColor,
                                icon: classes.whiteColor,
                            }}
                            >
                            {this.state.positions.map((option, idx) =>
                                <MenuItem key={idx} value={option.id}>{option.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                        <br></br>
                        <TextField
                            required
                            label="Ожидаемая зарплата"
                            name="EstimatedSalary"
                            onChange={this.onChange}
                            value={this.state.EstimatedSalary} 
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
                        <p id="test">
                            Оплата
                        </p>
                        <TextField
                            required
                            disabled
                            label="Предоплата"
                            name="prepayment"
                            onChange={this.onChange}
                            defaultValue={this.state.prepayment} 
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
                        <Button type="submit" style={styles.but} variant="contained" color="primary">Оформить квитанцию</Button>
                        </ValidatorForm>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(Form);