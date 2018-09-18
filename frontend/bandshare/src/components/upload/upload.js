import React, { Component } from "react"

export default class Upload extends Component {

	state = {
		title: "",
		album: "",
		description: "",
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
			data.append('description', this.state.description)
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

	authCheck = function () {
		if (!this.props.isBand) {
			return <h3>Please log in as an authorized band to upload music</h3>
		} else {
			return <div>
				<form action="" autoComplete='off'>
					<label htmlFor='title'>Song Name</label>
					<input id="title" type='text' value={this.state.title} onChange={this.change} />
					<label htmlFor='album'>Album</label>
					<input id="album" type='text' value={this.state.album} onChange={this.change} />
					<label htmlFor='description'>Description (optional)</label>
					<input id="description" type='text' value={this.state.description} onChange={this.change} />
					<label htmlFor='mp3'>MP3</label>
					<input id="mp3" type='file' onChange={this.fileChange} />
					<label htmlFor='genre'>Genres</label>
					<select id='genre' multiple onChange={ this.formChange}>
						{this.selectForm()}
					</select>
					<input type="button" value="Upload" onClick={this.upload} />
				</form>
			</div>
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
			<div>
				<h1>Upload</h1>
				{this.authCheck()}
			</div>
		)
	}
}