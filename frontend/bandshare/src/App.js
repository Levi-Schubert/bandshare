import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from "./components/nav/navbar";
import ApplicationViews from "./components/applicationViews";

class App extends Component {

	state = {

	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<ApplicationViews />
			</React.Fragment>
		)
	}
}

export default App;
