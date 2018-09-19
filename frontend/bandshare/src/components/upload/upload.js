import React, { Component } from "react"
import '../styles/upload.css'
export default class Upload extends Component {

	state = {
		title: "",
		album: "",
		mp3: null,
		genres: null,
		genre: null
	}

	change = function (evt) {
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}.bind(this)

	fileChange = function (e) {
		this.setState({mp3: e.target.files})
	}.bind(this)

	formChange = function (e) {
		let options = e.target.options
		let vals = []
		for (let i = 0; i < options.length; i += 1) {
			if (options[i].selected) {
				vals.push(`${this.props.api}/genres/${options[i].value}/`)
			}
		}
		if (vals.length === 0) {
			this.setState({ genre: null })
		} else {
			this.setState({ genre: vals })
		}
	}.bind(this)

	upload = function () {
		fetch(`${this.props.api}/band_profiles/`, {
			headers: {
				"Content-type": "application/json",
				'Authorization': `${this.props.token}`
			},
			method: 'GET'
		}).then(r => r.json()).then(r => {
			let data = new FormData()
			data.append('title', this.state.title)
			data.append('album', this.state.album)
			data.append('band', r.url)
			this.state.genre.forEach(genre => {
				data.append('genre', genre)
			});
			data.append('mp3', this.state.mp3[0])
			fetch(`${this.props.api}/songs/`, {
				headers: {
					'Authorization': `${this.props.token}`,
				},
				body: data,
				method: 'POST'
			}).then(r => r.json()).then(r => {
				this.props.history.push(`/listen/${r.id}`)
			})
		})
	}.bind(this)

	selectForm = function () {
		if (this.state.genres !== null) {
			let options = []
			let i = 0
			this.state.genres.forEach(genre => {
				options.push(<option key={i} value={`${genre.id}`}>{`${genre.genre}`}</option>)
				i += 1
			});
			return options
		}
	}

	fileName = function(){
		if(this.state.mp3 === null){
			return 'Choose an mp3 file'
		}else{
			return (this.state.mp3[0].name)
		}
	}

	checkFields = function(){
		if(this.state.title !== '' && this.state.album !== '' && this.state.mp3 !== null && this.state.genres !== null){
			return <input className='button is-warning is-inverted' type="button" value="Upload" onClick={this.upload} />
		}else{
			return <input className='button is-warning is-inverted' type="button" value="Upload" disabled />
		}
	}

	authCheck = function () {
		if (!this.props.isBand) {
			return <h3>Please log in as an authorized band to upload music</h3>
		} else {
			return 	<form action="" autoComplete='off'>
						<div className='level'>
							<div className='level-item'>
								<label htmlFor='title'>Song Name</label>
								<input className='input' id="title" type='text' value={this.state.title} onChange={this.change} />
							</div>
						</div>
						<div className='level'>
							<div className='level-item'>
								<label htmlFor='album'>Album</label>
								<input className='input' id="album" type='text' value={this.state.album} onChange={this.change} />
							</div>
						</div>
						<div className='level'>
							<div className='level-item file'>
								<label className='file-label' htmlFor='mp3'>
									<input className='file-input' id="mp3" type='file' accept='audio/mp3' name='mp3' onChange={this.fileChange} />
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
							<div className='level-item select is-multiple'>
								<label htmlFor='genre'>Genres</label>
								<select id='genre' multiple onChange={ this.formChange}>
									{this.selectForm()}
								</select>
							</div>
						</div>
						<div className='level'>
							<div className='level-item'>
								{this.checkFields()}
							</div>
						</div>
				</form>
		}
	}

	componentDidMount() {
		if (!this.props.loggedIn) {
			this.props.history.replace('/login')
		} else {
			fetch(`${this.props.api}/genres/`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${this.props.token}`
				},
				method: 'GET'
			}).then(r => r.json()).then(r => {
				this.setState({ genres: r })
			})
		}
	}

	render() {
		return (
			<div className='container'>
				<div className='level'>
					<h1 className='title level-item'>Upload</h1>
				</div>
				{this.authCheck()}
			</div>
		)
	}
}