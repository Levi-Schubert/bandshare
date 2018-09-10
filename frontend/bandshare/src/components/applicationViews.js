import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Login from "./login/login"
import Home from "./home/home"


export default class ApplicationViews extends Component {

    state = {
        
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Home />
                }} />
                <Route exact path="/song" render={(props) => {
                    return <Login />
                }} />
                <Route exact path="/login" render={(props) => {
                    return <Login />
                }} />
            </React.Fragment>
        )
    }
}