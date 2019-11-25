import React from "react";
import Home from "./components/head";
import Main from "./components/main";
import Users from "./components/users";
import Post from "./components/post";
import ReactDOM from "react-dom";

const routes = {
    "/": () => <Main />,
    "/products": () => <Users />,
    "/post/1": () => ({id}) => <Post postId={id} />
    /*"/post/:id": () => ({id}) => <Post postId={id} />*/
};

export default routes;