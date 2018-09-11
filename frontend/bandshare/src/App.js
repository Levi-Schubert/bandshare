import React, { Component } from 'react';
import './App.css';

import Navbar from "./components/nav/navbar";
import ApplicationViews from "./components/applicationViews";

class App extends Component {

	state = {
		loggedIn: false,
		user: "",
		token:"",
		api: "http://127.0.0.1:8000"
	}

	logIn = function(res) {
		this.setState({token: res})
	}.bind(this)

	render() {
		return (
			<React.Fragment>
				<Navbar loggedIn={this.state.loggedIn} />
				<ApplicationViews logIn={this.logIn} api={this.state.api}/>
			</React.Fragment>
		)
	}
}

export default App;
