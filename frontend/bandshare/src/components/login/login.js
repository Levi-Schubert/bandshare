import React, { Component } from "react"
import '../styles/login.css'

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

	checkEnter = function(evt){
		if(evt.key === 'Enter'){
			this.login()
		}
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
			if(r.hasOwnProperty('token')){
				this.props.logIn(r)
				this.props.history.replace('/')
			}else{
				alert('Incorrect username or password.')
			}
			
		})
	}.bind(this)


    render() {
        return (
			<div className='container'>
				<div className='level'>
					<h1 className='title level-item'>Login</h1>
				</div>
				<form action="">
					<div className='level'>
						<div className='level-item'>
							<label htmlFor='user'>Username</label>
							<input className='input' id="user" type='text' value={this.state.user} onChange={this.change}/>
						</div>
					</div>
					<div className='level'>
						<div className='level-item'>
							<label htmlFor='password'>Password</label>
							<input className='input' id="password" type='password' value={this.state.password} onChange={this.change} autoComplete='off' onKeyPress={this.checkEnter}/>
						</div>
					</div>
					<div className='level'>
						<div className='level-item'>
						<input className='button is-warning is-inverted' type='button' value='Log In' onClick={this.login} />
					</div>
				</div>
				</form>
			</div>
        )
    }
}