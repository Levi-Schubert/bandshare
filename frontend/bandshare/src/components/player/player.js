import React, { Component } from "react"
import WaveSurfer from 'wavesurfer.js';


export default class Player extends Component {

	constructor(props){
		super(props)
		this.wavesurfer = null;
		this.playing = false;
	}

	state={
		mp3: null,
		wavesurfer: null
	}

	playSong = function(){
		if(!this.playing){
			this.wavesurfer.play()
			this.playing = true
		}else{
			this.wavesurfer.pause()
			this.playing = false
		}
	}.bind(this)


	player = function(){
		if(this.state.mp3 !== null){
			this.wavesurfer.load(this.state.mp3)
		}
	}

	componentDidMount(){
		// get id from pathname
		let id = this.props.location.pathname.substring(8)
		fetch(`${this.props.api}/songs/${id}`).then(r => r.json()).then(song => {
			this.setState({mp3: song.mp3})
			console.log(song)
		})
		let wavesurfer = WaveSurfer.create({
			container: '#waveform',
			waveColor: 'turquoise',
			progressColor: 'blue'
		});
		this.wavesurfer = wavesurfer
	}

    render() {
        return (
            <div>
				<h1>Player</h1>
				{this.player()}
				<div id="waveform"></div>
				<input type='button' value='&nbsp;&nbsp;&nbsp;&#9654;&nbsp;&nbsp;&nbsp;' onClick={this.playSong}/>
			</div>
        )
    }
}