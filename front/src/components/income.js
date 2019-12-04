import React, { Component } from "react";
import axios from "axios";
import '../styles/income.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

class Income extends Component{
    constructor(props){
        super(props);
        this.state = {
            incomes: [],
            start: "2019-11-30",
            end: "2019-12-30",
            check: "",
        };
        this.handle = this.handle.bind(this);
        this.search = this.search.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
    }
    onChangeStart(e){
        if(e == 'Invalid Date' || e == 'invalid time value'){
            this.setState({ start: ""});
            console.log("ssssssssssssss");
        }
        else{
            const { format } = require('date-fns');
            let newData = format(e, 'yyyy-MM-dd');
            this.setState({ start: newData});
            if(this.state.start === "" && this.state.end === ""){
                this.setState({ check: "1"});
            }
            else if(this.state.start === "" && this.state.end !== ""){
                this.setState({ check: "2"});
            }
            else if(this.state.start !== "" && this.state.end === ""){
                this.setState({ check: "3"});
            }
            else if(this.state.start !== "" && this.state.end !== ""){
                this.setState({ check: "4"});
            }
        }
        // const { format } = require('date-fns');
        // console.log(e)
        // console.log(`Heute ist der: ${format(e, 'yyyy-MM-dd')}`);
    }
    onChangeEnd(e){
        console.log(e);
        if(e == 'Invalid Date' || e == 'invalid time value'){
            console.log("ssssssssssssss");
            this.setState({ end: ""});
        }
        else{
            const { format } = require('date-fns');
            let newData = format(e, 'yyyy-MM-dd');
            this.setState({ end: newData});
            if(this.state.start === "" && this.state.end === ""){
                this.setState({ check: "1"});
            }
            else if(this.state.start === "" && this.state.end !== ""){
                this.setState({ check: "2"});
            }
            else if(this.state.start !== "" && this.state.end === ""){
                this.setState({ check: "3"});
            }
            else if(this.state.start !== "" && this.state.end !== ""){
                this.setState({ check: "4"});
            }
        }
    }
    handle(){
        let JWT = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/income',{
            params: {
                token: JWT,
                check: "1",
            }
        })
            .then(response => {
                if (response.data.text == 'ok'){
                    this.setState({ incomes: response.data.incomes});
                    console.log(response.data.incomes)
                }
                else{
                    console.log("д")
                }
            })
            .catch(response => {
                console.log(response);
            })
    }
    search(){
        let JWT = localStorage.getItem('token');
        console.log(this.state.check);
        axios.get('http://127.0.0.1:8000/api/income',{
            params: {
                token: JWT,
                check: this.state.check,
                start: this.state.start,
                end: this.state.end,
            }
        })
            .then(response => {
                if (response.data.text == "ok"){
                    this.setState({ incomes: response.data.incomes});
                    console.log(response.data.incomes)
                }
                else{
                    ToastsStore.warning("Ничего не найдено")
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
                {/* <div id="centrthree">
                    <p id="test"> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="Начальная дата"
                            value={this.state.start}
                            onChange={this.onChangeStart}
                            className={classes.root}
                            InputProps={{
                            className: classes.input,
                            }}
                            InputLabelProps={{
                                className: classes.lab,
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="Конечная дата"
                            value={this.state.end}
                            onChange={this.onChangeEnd}
                            className={classes.root}
                            InputProps={{
                            className: classes.input,
                            }}
                            InputLabelProps={{
                                className: classes.lab,
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                    </MuiPickersUtilsProvider>
                    <Button style={styles.but} variant="contained" color="primary" onClick={() => { this.search() }}>Поиск</Button>
                    {/* </p>
                    
                </div> */}
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
                    <MaterialTable
                         localization={{
                            toolbar:{
                                searchPlaceholder: "Поиск"
                            },
                            header:{
                                actions: "Действия"
                            },
                        }}
                        style={{
                            background: "#BDBDBD",
                        }}
                        title="Доход"
                        columns={[
                            { title: "Специальность", field: "name" },
                            { title: "Доход", field: "sum"}
                        ]}
                        data={this.state.incomes}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Income);