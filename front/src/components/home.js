import React, { Component } from "react";
import '../styles/main.css';
import RightMenu from "./rightmenu";
import Content from "./content";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {test:"sssss", test2: "ТЕст2"};
    }
    /*handleClick3(){
        this.setState({test:"получилось хоть это"});
    }
    handleClick2(){
        this.setState({test:"получилось хоть это"});
    }*/
    /*shouldComponentUpdate(nextProps, nextState) {
        console.log("Пропсы мейн");
        console.log(nextProps);
        console.log("Состояния мейн");
        console.log(nextState);
        return true;
    }
    componentDidUpdate(prevProps, prevState){
        console.log("Пропсы мейн");
        console.log(prevProps);
        console.log("Состояния мейн");
        console.log(prevState);
    }*/
    render() {
        return (
            <div id="main">
                <RightMenu />
                <Content />
            </div>
        );
    }
}

export default Home;