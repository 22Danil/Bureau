import React, { Component } from "react";
import '../styles/basement.css';
import { Link } from 'react-router-dom'
import fb from '../images/fb.png';
import tel from '../images/tel.png';

class Basement extends Component{
    constructor(props){
        super(props);
        this.state = {role: ""};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        let rol = localStorage.getItem('role');
        this.setState({role: rol});
    }
    componentWillMount(){
        this.handleClick();
    }
    render() {
        return (
            <div id="foot">
                <p>Copyright 2019 Интернет-бюро трудоустройств Bureau</p>
                <p>
                    <a href="https://www.facebook.com/"><img src={fb} width={20} height={20} alt="Logo" /></a>
                    <a href="https://www.facebook.com/"><img src={tel} width={20} height={20} alt="Logo" /></a>
                </p>
            </div>
        );
    }
}

export default Basement;
