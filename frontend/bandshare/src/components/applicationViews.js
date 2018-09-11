import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Login from "./login/login"
import Home from "./home/home"
import Register from "./register/register"


export default class ApplicationViews extends Component {

    state = {
        
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Home {...props} />
                }} />
                <Route exact path="/login" render={(props) => {
					return <Login {...props} logIn={this.props.logIn} api={this.props.api}/>
                }} />
				<Route exact path="/register" render={(props) => {
					return <Register {...props} logIn={this.props.logIn} api={this.props.api}/>
				}} />
            </React.Fragment>
        )
    }
}