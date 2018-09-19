import React, { Component } from 'react';
import './App.css';

import Navbar from "./components/nav/navbar";
import ApplicationViews from "./components/applicationViews";

class App extends Component {

	state = {
		loggedIn: false,
		token: "",
		api: "http://127.0.0.1:8000",
		isBand: false
	}

	logIn = function (res) {
		this.setState({ token: `token ${res.token}`, loggedIn: true })
		// debugger

		fetch(`${this.state.api}/band_profiles/`, {
			headers: {
				"Content-type": "application/json",
				'Authorization': `token ${res.token}`
			},
			method: 'GET'
		}).then(r => r.json()).then(r => {
			if (r.hasOwnProperty('isBand')) {
				this.setState({ isBand: r.isBand })
			}
		})

	}.bind(this)

	logOut = function () {
		this.setState({ token: "", loggedIn: false, isBand: false })
	}.bind(this)

	componentDidMount(){
		let root = document.getElementById('root')
		root.classList.add('hero')
	}

	render() {
		return (
			<React.Fragment>
				<Navbar loggedIn={this.state.loggedIn} isBand={this.state.isBand} api={this.state.api} />
				<ApplicationViews loggedIn={this.state.loggedIn} logIn={this.logIn} logOut={this.logOut} api={this.state.api} isBand={this.state.isBand} token={this.state.token} />
			</React.Fragment>
		)
	}
}

export default App;
