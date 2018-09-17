import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Band extends Component {

	state = {
		band: null,
		songs: null
	}

	linkSongs = function(){
		if(this.state.songs !== null){
			let list = []
			this.state.songs.forEach(song => {
				list.push(
					<li key={song.id}>
						<Link to={`/listen/${song.id}`}>{song.title}</Link>
					</li>
				)	
			});
			return list
		}else{
			return <li><h4>This artist has no songs uploaded</h4></li>
		}
	}.bind(this)

	loaded = function(){
		if(this.state.band !== null ){
			return 	<div>
						<h1>{this.state.band.bandName}</h1>
						<h3>{this.state.band.city}, {this.state.band.state} </h3>
						<h3>Songs</h3>
						<ul>
							{this.linkSongs()}
						</ul>

					</div>
		}
	}.bind(this)

	componentDidMount() {
		if (!this.props.loggedIn) {
			if( this.props.location.pathname.length < 6){
				this.props.history.replace('/login')
			}else{
				let id = this.props.location.pathname.substring(6)
				fetch(`${this.props.api}/band_profiles/${id}`, {
					headers: {
						"Content-type": "application/json"
					},
					method: 'GET'
				}).then(r => r.json()).then(r => {
					this.setState({band: r})
					fetch(`${this.props.api}/songs/?band=${id}`).then(r => r.json()).then(r => {
						this.setState({songs: r})
					})
				})
			}
		} else {
			fetch(`${this.props.api}/band_profiles/`, {
				headers: {
					"Content-type": "application/json",
					'Authorization': `${this.props.token}`
				},
				method: 'GET'
			}).then(r => r.json()).then(r => {
				this.setState({band: r})
				fetch(`${this.props.api}/songs/?band=${r.id}`).then(res => res.json()).then(res => {
					this.setState({songs: res})
				})
			})
		}
	}

	render() {
		return (
			<div>
				{this.loaded()}
			</div>
		)
	}
}