import React, { Component } from "react"
import { Link } from "react-router-dom"
import '../styles/band.css'

export default class Band extends Component {

	state = {
		band: null,
		songs: null,
		editable: false,
		editing: false,
		bio: '',
		image: null
	}

	linkSongs = function(){
		if(this.state.songs !== null){
			let list = []
			this.state.songs.forEach(song => {
				list.push(
					<li key={song.id} className='level'>
						<div className='level-item'>
							<Link id='band__song' className='button is-warning is-inverted' to={`/listen/${song.id}`}>{song.title}</Link>
						</div>
					</li>
				)	
			});
			return list
		}else{
			return <li><h4>This artist has no songs uploaded</h4></li>
		}
	}.bind(this)

	image = function(){
		if(this.state.band.image !== null){
			return 	<div className='level'>
						<div className='level-item'>
							<img id='bandImage' src={this.state.band.image} alt={this.state.band.bandName} width='200px'/>
						</div>
					</div>
		}
	}.bind(this)

	handleChange = function (evt) {
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	imageChange = function (e) {
		this.setState({image: e.target.files})
	}.bind(this)


	edit = function(){
		if(this.state.editing){
			this.setState({editing: false})
		}else{
			this.setState({editing: true})
		}
	}.bind(this)

	submitEdit = function(){
		let form = new FormData()
		if(this.state.image !== null){
			form.append('image', this.state.image[0])
		}
		form.append('bio', this.state.bio)
		fetch(`${this.props.api}/band_profiles/${this.state.band.id}/`, {
		headers: {
			'Authorization': `${this.props.token}`
		},
		method: 'PATCH',
		body: form
		}).then(r => r.json()).then(r => {
			this.setState({band: r})
			this.setState({editing: false})
		})
	}.bind(this)

	fileName = function(){
		if(this.state.image === null){
			return 'Choose an image file'
		}else{
			return (this.state.image[0].name)
		}
	}

	loaded = function(){
		if(this.state.band !== null){
			if(this.state.editable){
				if(!this.state.editing){
					return 	<div className='container'>
								<div className='level'>
									<h1 className='title level-item'>{this.state.band.bandName}</h1>
								</div>
								{this.image()}
								<div className='level'>
									<div className='level-item'>
										<h3 className='title is-5'>{this.state.band.city}, {this.state.band.state} </h3>
									</div>
								</div>
								<div className='level'>
									<div className='level-item'>
										<p>{this.state.band.bio}</p>
									</div>
								</div>
								<div className='level'>
									<div className='level-item'>
										<input className='button is-warning is-inverted' type='button' value='Edit' onClick={this.edit}/>
									</div>
								</div>
								<div className='level'>
									<h3 className='title is-4 level-item'>Songs</h3>
								</div>
								<ul>
									{this.linkSongs()}
								</ul>
							</div>
				}else{
					return 	<div className='container'>
								<div className='level'>
									<h1 className='title level-item'>{this.state.band.bandName}</h1>
								</div>
								{this.image()}
								<div className='level'>
									<div className='level-item'>
										<h3 className='title is-5'>{this.state.band.city}, {this.state.band.state} </h3>
									</div>
								</div>
								<div className='level'>
									<p className='title is-5 level-item'>Bio</p>
								</div>
								<div className='level'>
									<div className='level-item'>
										<textarea className='textarea' id='bio' type='textarea' value={this.state.bio} onChange={this.handleChange} />
									</div>
								</div>
								<div className='level'>
									<div className='level-item file'>
										<label className='file-label' htmlFor='image'>
											<input className='file-input' id='image' type='file' accept="image/x-png,image/gif,image/jpeg" onChange={this.imageChange}/>
											<span className="file-cta">
												<span className="file-icon">
													<i className="fas fa-upload"></i>
												</span>
												<span className="file-label">
													Choose a file…
												</span>
											</span>
										<span className="file-name">
											{this.fileName()}
										</span>
										</label>
									</div>
								</div>
								<div className='level'>
									<div className='level-item'>
										<input className='button is-warning is-inverted' type='button' value='Cancel' onClick={this.edit}/>
										<input className='button is-warning is-inverted' type='button' value='Save' onClick={this.submitEdit}/>
									</div>
								</div>
							</div>
				}
			}else{
				return 	<div className='container'>
							<div className='level'>
								<h1 className='title level-item'>{this.state.band.bandName}</h1>
							</div>
							{this.image()}
							<div className='level'>
								<div className='level-item'>
									<h3 className='title is-5'>{this.state.band.city}, {this.state.band.state} </h3>
								</div>
							</div>
							<div className='level'>
								<div className='level-item'>
									<p>{this.state.band.bio}</p>
								</div>
							</div>
							<div className='level'>
								<h3 className='title is-4 level-item'>Songs</h3>
							</div>
							<ul>
								{this.linkSongs()}
							</ul>
						</div>
			}
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
				this.setState({bio: r.bio})
				this.setState({editable: true})
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