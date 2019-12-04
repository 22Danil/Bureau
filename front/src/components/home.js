import React, { Component } from "react";
import Content from "./content";
import '../styles/main.css';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {test:"sssss", test2: "ТЕст2"};
    }
    render() {
        return (
            <div id="mainBlock">
                <Content />
            </div>
        );
    }
}

export default Home;