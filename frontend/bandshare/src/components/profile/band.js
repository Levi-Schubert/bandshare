import React, { Component } from "react"

export default class Band extends Component {

	state = {
		band: null
	}

	componentDidMount() {
		if (!this.props.loggedIn) {
			this.props.history.replace('/login')
		} else {
			fetch(`${this.props.api}/band_profiles/`, {
				headers: {
					"Content-type": "application/json",
					'Authorization': `${this.props.token}`
				},
				method: 'GET'
			}).then(r => r.json()).then(r => {
				this.setState({band: r})
			})
		}
	}

	render() {
		return (
			<h1>Band Profile</h1>
		)
	}
}