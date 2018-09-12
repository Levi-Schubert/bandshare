import React, { Component } from "react"

export default class Upload extends Component {
	
	state = {
		title: "",
		album: "",
		description: "",
		mp3: null,
	}

	change = function(evt){
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	upload = function(){
		console.log('hello')
	}

	authCheck = function(){
		if(!this.props.isBand){
			return <h3>Please log in as an authorized band to upload music</h3>
		}else{
			return <div> 
				<form action="" autoComplete='off'>
					<label htmlFor='title'>Song Name</label>
					<input id="title" type='text' value={this.state.title} onChange={this.change}/>
					<label htmlFor='album'>Album</label>
					<input id="album" type='text' value={this.state.album} onChange={this.change}/>
					<label htmlFor='description'>Description (optional)</label>
					<input id="description" type='text' value={this.state.description} onChange={this.change}/>
					<label htmlFor='mp3'>MP3</label>
					<input id="mp3" type='file' onChange={this.change}/>
					<input type="button" value="Upload" onClick={this.upload}/>
				</form>
			</div>
		}
	}

	componentDidMount(){
		console.log(this.props.loggedIn)
		if(!this.props.loggedIn){
			this.props.history.replace('/login')
		}
	}

    render() {
        return (
			<div>
				<h1>Upload</h1>
				{this.authCheck()}
			</div>
		)
    }
}