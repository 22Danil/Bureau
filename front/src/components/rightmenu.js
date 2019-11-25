import React, { Component } from "react";

import '../styles/main.css';


class rightmenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {test:"sssss", test2: "ТЕст2"};
    }
    render() {
        return (
            <div id="rightMenu">
                <h2>About</h2>
                <p>Можно предположить, что комплексное число недоказуемо. Ортогональный определитель, в первом
                    приближении, порождает интеграл от функции, обращающейся в бесконечность в изолированной точке.
                    Огибающая семейства поверхностей</p>
            </div>
        );
    }
}

export default rightmenu;