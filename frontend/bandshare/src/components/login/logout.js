import React, { Component } from "react"

export default class Logout extends Component {

	componentDidMount(){
		this.props.logOut()
		this.props.history.replace('/')
	}
    

    render() {
        return (
			<h1>Logging Out</h1>
        )
    }
}