import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
/*import { useRoutes, A } from "hookrouter";

import routes from "./router";

function App() {
    const rout = useRoutes(routes);
    return rout || <NotFoundPage />;//разобраться почему не работает!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}*/

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.getElementById("root")
);