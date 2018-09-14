import React, { Component } from "react"


export default class Home extends Component {

    state = {
        
	}
	
	band = function(){
		if(this.props.isBand && this.props.loggedIn){
			return <h2> You're a band account </h2>
		}else{
			if(this.props.loggedIn){
				return <h2>You're a listener account</h2>
			}
		}
	}

    render() {
        return (
			<div>
				<h1>this is a home page</h1>
				{this.band()}
			</div>
		)
    }
}