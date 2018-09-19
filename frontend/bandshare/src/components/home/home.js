import React, { Component } from "react"
import bandshare from '../../img/bandshare.jpg'

export default class Home extends Component {

    state = {
        
	}
	
	checkAuth = function(){
		if(!this.props.loggedIn){
			return 	<div>
						<div className='level'>
							<p className='level-item title is-5'>Please Log in or register</p>
						</div>
						<div className='level'>
							<p className='level-item'>registration is required to favorite songs or to upload music</p>
						</div>
					</div>
		}
	}

	

    render() {
        return (
			<div className='container'>
				<div className='level'>
					<h1 className='level-item title'>Welcome to BandShare</h1>
				</div>
				{this.checkAuth()}
				<div className='level'>
					<div className='level-item'>
						<img src={bandshare} alt="Home" width='50%' style={{marginTop:'32px'}}/>
					</div>
				</div>
			</div>
		)
    }
}