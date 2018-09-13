import React, { Component } from "react"

export default class Login extends Component {

    state = {
		user:"",
		password:"",
		redirect: false
	}
	
	change = function(evt){
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	login = function(){
		let data = {
			username: this.state.user,
			password: this.state.password
		}
		fetch(`${this.props.api}/login/`, {
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data),
			method: 'POST'
		}).then(r => r.json()).then(r => {
			this.props.logIn(r)
			this.props.history.replace('/')
			
		})
	}.bind(this)


    render() {
        return (
			<div>
				<h1>Login</h1>
				<form action="">
				<label htmlFor='user'>Username</label>
					<input id="user" type='text' value={this.state.user} onChange={this.change}/>
					<label htmlFor='password'>Password</label>
					<input id="password" type='password' value={this.state.password} onChange={this.change} autoComplete='off'/>
					<input type='button' value='Log In' onClick={this.login} />
				</form>
			</div>
        )
    }
}