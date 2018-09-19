import React, { Component } from "react"
import WaveSurfer from 'wavesurfer.js';
import { Link } from "react-router-dom"
import '../styles/player.css'


export default class Player extends Component {

	constructor(props){
		super(props)
		this.wavesurfer = null;
		this.playing = false;
		this.volume = 100;
	}

	state={
		song: null,
		mp3s: null,
		multi: false,
		wavesurfer: null,
		track: 0,
		maxIndex: 0,
		current: null,
		currentArtist: null,
		bandId: null
	}

	handleLike = function(){
		if(this.props.loggedIn){
			fetch(`${this.props.api}/user_profiles/`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${this.props.token}`
				},
				method: 'GET'
			}).then(r => r.json()).then(r => {
				let form = new FormData()
				if(r.liked.length !== 0){
					r.liked.forEach(song => {
						form.append('liked', song)
					});	
				}
				let id
				if(this.state.multi){
					id = this.state.current.id
				}else{
					id = this.state.song.id
				}
				form.append('liked', `${this.props.api}/songs/${id}/`)
				fetch(`${this.props.api}/user_profiles/${r.id}/`, {
					headers: {
						'Authorization': `${this.props.token}`
					},
					body: form,
					method: 'PATCH'
				}).then(res => res.json()).then(res => {
					console.log(res)
				})
			})
		}
	}.bind(this)

	setVolume = function(){
		this.wavesurfer.setVolume(this.volume/100)
	}.bind(this)

	change = function (evt) {
		this.volume = evt.target.value
		this.setVolume()
	}.bind(this)

	nowPlaying = function (){

		if(this.state.multi && this.state.mp3s !== null){
			return 	<div id='nowPlaying'>
						<div className='level'>
							<p className='title is-4 level-item'>Now Playing</p>
						</div>
						<div className='level'>
							<div className='level-item'>
								<h2 id='space' className='title is-4'>{this.state.current.title}</h2>
								<h2 id='spacer' className='title is-4'>|</h2>
								<Link id='space__link' className='title is-5 tag' to={`/band/${this.state.bandId}`}>{this.state.currentArtist}</Link>
							</div>
						</div>
					</div>
		}else{
			if(this.state.song !== null){
				return 	<div id='nowPlaying'>
							<div className='level'>
								<p className='title is-4 level-item'>Now Playing</p>
							</div>
						<div className='level'>
							<div className='level-item'>
								<h2 id='space' className='title is-4'>{this.state.song.title}</h2> 
								<h2 id='spacer' className='title is-4'>|</h2>			
								<Link id='space__link' className='title is-5 tag' to={`/band/${this.state.bandId}`}>{this.state.currentArtist}</Link>
							</div>
						</div>
					</div>
			}
		}
		
	}.bind(this)

	playSong = function(){
		if(!this.playing){
			this.wavesurfer.play()
			this.playing = true
		}else{
			this.wavesurfer.pause()
			this.playing = false
		}
	}.bind(this)

	prev = function(){
		if(this.state.multi && (this.state.track !== 0)){
			this.wavesurfer.load(this.state.mp3s[this.state.track - 1].mp3)
			this.setState({current: this.state.mp3s[this.state.track - 1]})
			fetch(`${this.state.mp3s[this.state.track - 1].band}`).then(r => r.json()).then(band => {
				this.setState({currentArtist: band.bandName})
				this.setState({bandId: band.id})
			})
			let val = this.state.track - 1
			this.setState({track: val})
			this.playing = false
		}else{
			if(!this.state.multi){
				this.wavesurfer.seekTo(0)
			}
		}
	}.bind(this)
	
	next = function(){
		if(this.state.multi){
			this.wavesurfer.load(this.state.mp3s[this.state.track + 1].mp3)
			this.setState({current: this.state.mp3s[this.state.track + 1]})
			fetch(`${this.state.mp3s[this.state.track + 1].band}`).then(r => r.json()).then(band => {
				this.setState({currentArtist: band.bandName})
				this.setState({bandId: band.id})
			})
			let val = this.state.track + 1
			this.setState({track: val})
			this.playing = false
			if(val === this.state.maxIndex - 1){
				this.loadMore()
			}
		}
	}.bind(this)

	loadMore = function(){
		let id = this.props.location.pathname.substring(14)
		fetch(`${this.props.api}/songs/?genre=${id}`).then(r => r.json()).then(songs => {
			let newList = this.state.mp3s
			newList = newList.concat(songs)
			this.setState({mp3s: newList})
			this.setState({maxIndex: newList.length - 1})
		})
	}.bind(this)

	player = function(){
		if(this.state.song !== null){
			this.wavesurfer.load(this.state.song.mp3)
		}else{
			if(this.state.multi === true && this.state.mp3s !== null){
				this.wavesurfer.load(this.state.mp3s[this.state.track].mp3)
			}
		}
	}

	favoriteButton = function(){
		if(this.props.loggedIn && !this.props.isBand){
			return <input id='fave' className='button is-warning is-inverted' type='button' value='Favorite' onClick={this.handleLike} />
		}
	}.bind(this)

	componentDidMount(){
		if(this.props.location.pathname.includes('undefined') || this.props.location.pathname.includes('Select')){
			this.props.history.replace('/')
		}else{
			// get id from pathname
			if(this.props.location.pathname.includes('genre')){
				this.setState({multi: true})
				let id = this.props.location.pathname.substring(14)
				fetch(`${this.props.api}/songs/?genre=${id}`).then(r => r.json()).then(songs => {
					this.setState({current: songs[0]})
					fetch(`${songs[0].band}`).then(r => r.json()).then(band => {
						this.setState({currentArtist: band.bandName})
						this.setState({bandId: band.id})
						this.setState({mp3s: songs})
						this.setState({maxIndex: songs.length - 1})
					})
				})
			}else{
				let id = this.props.location.pathname.substring(8)
				fetch(`${this.props.api}/songs/${id}`).then(r => r.json()).then(song => {
					fetch(`${song.band}`).then(r => r.json()).then(band => {
						this.setState({currentArtist: band.bandName})
						this.setState({bandId: band.id})
						this.setState({song: song})
					})
				})
			}
			let wavesurfer = WaveSurfer.create({
				container: '#waveform',
				waveColor: '#e8cc17',
				progressColor: '#34373a',
				responsive: true
			});
			this.wavesurfer = wavesurfer
		}
	}

	componentWillUnmount(){
		if(this.wavesurfer !== null){
			this.wavesurfer.destroy()
		}
	}

    render() {
        return (
            <div className='container'>
				{this.nowPlaying()}
				{this.player()}
				<div id="waveform" className='notification'></div>
				<div className='level'>
					<div className='level-item'>
						<input className='button is-warning is-inverted' type='button' value='&nbsp;&nbsp;&nbsp;&#171;&nbsp;&nbsp;&nbsp;' onClick={this.prev}/>
						<input id='play'className='button is-warning is-inverted' type='button' value='&nbsp;&nbsp;&nbsp;&#9654;&nbsp;&nbsp;&nbsp;' onClick={this.playSong}/>
						<input className='button is-warning is-inverted' type='button' value='&nbsp;&nbsp;&nbsp;&#187;&nbsp;&nbsp;&nbsp;' onClick={this.next} />
					</div>
				</div>
				<div className='level'>
					<div className='level-item'>
						<span>&nbsp;&nbsp;Volume&nbsp;&nbsp;</span>
						<input id='volume' type='range' min='0' max='100' defaultValue='100' onChange={this.change}/>
						{this.favoriteButton()}
					</div>
				</div>
			</div>
        )
    }
}