import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Login from "./login/login"
import Home from "./home/home"
import Register from "./register/register"
import Player from "./player/player"
import Logout from './login/logout'
import Upload from './upload/upload'


export default class ApplicationViews extends Component {

    state = {
        
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <Home {...props} isBand={this.props.isBand} loggedIn={this.props.loggedIn}/>
                }} />
                <Route exact path="/login" render={(props) => {
					return <Login {...props} logIn={this.props.logIn} api={this.props.api}/>
                }} />
                <Route exact path="/logout" render={(props) => {
					return <Logout {...props} logOut={this.props.logOut} api={this.props.api}/>
                }} />
				<Route exact path="/register" render={(props) => {
					return <Register {...props} logIn={this.props.logIn} api={this.props.api}/>
				}} />
				<Route exact path="/upload" render={(props) => {
					return <Upload {...props} isBand={this.props.isBand} loggedIn={this.props.loggedIn} api={this.props.api}/>
				}} />
				<Route exact path="/listen/:id" render={(props) => {
					return <Player {...props} token={this.props.token} api={this.props.api}/>
				}} />
            </React.Fragment>
        )
    }
}