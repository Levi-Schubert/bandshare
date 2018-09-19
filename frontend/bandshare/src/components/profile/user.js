import React, { Component } from "react"
import { Link } from "react-router-dom"
import '../styles/favorites.css'

export default class User extends Component {

	state = {
		user: null,
		liked: null,
		likes: null
	}

	list = function () {

		if (this.state.likes !== null) {
			let hold = <ul>
				{this.state.likes}
			</ul>
			return hold
		}
	}.bind(this)


	componentDidMount() {
		if (!this.props.loggedIn) {
			this.props.history.replace('/login')
		} else {
			fetch(`${this.props.api}/user_profiles/`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${this.props.token}`
				},
				method: 'GET'
			}).then(r => r.json()).then(res => {
				this.setState({ user: res })
				this.setState({ liked: res.liked })
				if (res.liked.length === 0) {
					this.setState({ likes: <p>You have no liked songs</p> })
				} else {
					let likes = []
					res.liked.forEach(like => {
						let id = like.substring(28)
						id = id.substring(0, id.length - 1)
						fetch(like).then(r => r.json()).then(song => {
							fetch(`${song.band}`).then(r => r.json()).then(band => {
								likes.push(
									<li key={id} className='level'>
										<div className='level-item'>
											<Link id='favorite' className='button is-warning is-inverted' to={`/listen/${id}`}>{`${song.title} by ${band.bandName}`}</Link>
										</div>
									</li>
								)
								return likes
							}).then(r => {
								if (likes.length === res.liked.length) {
									this.setState({ likes: likes })
								}
							})
						})
					});


				}
			})
		}
	}

	render() {
		return (
			<div className='container'>
				<div className='level'>
					<h2 className='title level-item'>Favorited Songs</h2>
				</div>
				<div id='favorite__songs'>
					{this.list()}
				</div>
			</div>
		)
	}
}