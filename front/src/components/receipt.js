import React, { Component } from "react";
import axios from "axios";
import '../styles/receipt.css';
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const styles = {
    card: {
      minWidth: 275,
      maxWidth: 300,
      background: "#BDBDBD",
      float: "left",
      marginLeft: 10,
      marginTop: 10,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    but:{
        textTransform: "none",
    },
  };

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
                        ToastsStore.info("На данный момент вакансий нет, но скоро будут)")
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
        const { classes } = this.props;
        return (
            <div id="mainBlock">
                <div>
                <p align="justify">
                            На этой странице находятся все ваши заявки на поиск работы. Кнопка "Оплата" говорит о том что 
                            для вас найдена работа и при полной оплате вы можете получить всю информацию. Кнопка "Искать" 
                            означает что вы можете запустить поиск вакансий, если ранее система не нашла подходящую вам вакансию.
                        </p>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
                    {this.state.reseipts.map((option, idx) =>
                        <div key={idx}>
                            <Card className={classes.card}>
                                <CardContent>
                                        №{option.id}
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {option.dateadded} {option.lastname} {option.name} {option.middlename}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {option.namespecialty}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {option.nameposition}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Ожидаемая зарплата: {option.estimated_salary}
                                            <br />
                                            Предоплата: {option.prepayment}
                                        </Typography>
                                </CardContent>
                                <CardActions>
                                    {option.employer_id ? <Button style={styles.but} variant="contained" onClick={() => { this.pay(option.id) }}>Оплата</Button> : <Button style={styles.but} variant="contained" onClick={() => { this.search(option.specialty_id, option.position_id,option.estimated_salary,option.id) }}>Искать</Button>}
                                </CardActions>
                            </Card>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Receipt);