import React, { Component } from "react";
import axios from "axios";
import '../styles/work.css';
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
      minWidth: 200,
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
      marginBottom: 0,
    },
    but:{
        textTransform: "none",
    },
  };

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
                    this.setState({ works: response.data.works});
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
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
                    {this.state.works.map((option, idx) =>
                        <div key={idx}>
                            <Card className={classes.card}>
                                <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {option.dateadded} {option.lastname} {option.name} {option.middlename}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {option.title}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {option.namespecialty}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {option.nameposition}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Зарплата: {option.salary}
                                            <br />
                                            Адрес: {option.address}
                                            <br />
                                            Номер: {option.number}
                                        </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Work);