import React, { Component } from "react"


export default class Register extends Component {

    state = {
		user: "",
		email: "",
		password: "",
		passwordVerify: "",
		city: "",
		state: "",
		isBand: false,
		bandName:''
    }

	change = function(evt){
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	register = function(evt){
		if(this.state.password === this.state.passwordVerify){
			
			let registerJson
			if(this.state.isBand === 'on'){
				registerJson = {
					username: this.state.user,
					email: this.state.email,
					password: this.state.password,
					state: this.state.state,
					city: this.state.city,
					isBand: true,
					bandName: this.state.bandName
				}
			}else{
				registerJson = {
					username: this.state.user,
					email: this.state.email,
					password: this.state.password
				}

			}
			fetch(`${this.props.api}/register/`, {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(registerJson),
				method: 'POST' 
			}).then(r => r.json()).then(r => {
				this.props.logIn(r)
				this.props.history.replace('/')
			})
		}
	}.bind(this)

	newBand = function(){
		if(this.state.isBand === 'on'){
			return 	<div>
						<label htmlFor='city'>City</label>
						<input id="city" type='text' value={this.state.city} onChange={this.change}/>
						<label htmlFor='state'>State</label>
						<input id="state" type='text' value={this.state.state} onChange={this.change}/>
						<label htmlFor='bandName'>Band Name</label>
						<input id="bandName" type='text' value={this.state.bandName} onChange={this.change}/>
					</div>
		}
	}
	
	passwordMatch = function(){
		if(this.state.password === this.state.passwordVerify){
			return <p> Passwords match</p>
		}else{
			return <p>Passwords do not match</p>
		}
	}.bind(this)
	
    render() {
		return (
			<div>
				<h1>Register</h1>
				<form action="" autoComplete='off'>
					<label htmlFor='user'>Username</label>
					<input id="user" type='text' value={this.state.user} onChange={this.change}/>
					<label htmlFor='email'>Email</label>
					<input id="email" type='text' value={this.state.email} onChange={this.change}/>
					<label htmlFor='password'>Password</label>
					<input id="password" type='password' value={this.state.password} onChange={this.change} autoComplete='off'/>
					<label htmlFor='passwordVerify'>Verify password</label>
					<input id="passwordVerify" type='password' value={this.state.passwordVerify} onChange={this.change} autoComplete='off'/>
					<label htmlFor='isBand'>Band?</label>
					<input id='isBand' type="checkbox" onChange={this.change}/>
					{this.newBand()}
					{this.passwordMatch()}
					<input type="button" value="Register" onClick={this.register}/>
				</form>
			</div>
        )
    }
}