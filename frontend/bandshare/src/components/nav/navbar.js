import React, { Component } from "react"
import { Link } from "react-router-dom"
import bandshare from '../../img/bandshare.jpg'


export default class Navbar extends Component {

	state = {
		genres: null
	}

	loggedIn = function(){
		if(this.props.loggedIn){
			if(this.props.isBand){
				return 	<div>
							<li>
								<Link to='/upload'>Upload</Link>
							</li>
							<li>
								<Link to='/band'>My Profile</Link>
							</li>
							<li>
								<Link to='/logout'>Logout</Link>
							</li>
						</div>
			}else{
				return 	<div>
							<li>
								<Link to='/favorites'>My Favorites</Link>
							</li>
							<li>
								<Link to='/logout'>Logout</Link>
							</li>
						</div>
			}
		}else{
			return <div>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</div>
		}
	}


	formChange = function (e) {
		let options = e.target.options
		let selected = ""
		for (let i = 0; i < options.length; i += 1) {
			if (options[i].selected) {
				selected = options[i].value
			}
		}
		this.setState({ genre: selected })
	}.bind(this)

	populate = function(){
		if (this.state.genres !== null) {
			let options = []
			let i = 0
			this.state.genres.forEach(genre => {
				options.push(<option key={i} value={`${genre.id}`}>{`${genre.genre}`}</option>)
				i += 1
			});
			return options
		}
	}.bind(this)

	genre = function(){
		return <li>
					<select id='genre' onChange={this.formChange}>
						<option value={null} defaultValue> Select a Genre </option>
						{this.populate()}
					</select>
					<Link to={`/listen/genre/${this.state.genre}`}>Listen</Link>
				</li>
	}.bind(this)

	componentDidMount(){
		fetch(`${this.props.api}/genres/`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET'
		}).then(r => r.json()).then(r => {
			this.setState({ genres: r })
		})
	}

    render() {
        return (
            <nav >
                <ul>
                    <li>
                        <Link to="/"><img src={bandshare} alt="Home" width='100px'/></Link>
                    </li>
					{this.loggedIn()}
					{this.genre()}
                </ul>
            </nav>
        )
    }
}