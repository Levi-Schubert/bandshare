import React, { Component } from "react"
import { Link } from "react-router-dom"


export default class Navbar extends Component {


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
								<Link to='/user'>My Profile</Link>
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


    render() {
        return (
            <nav >
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
					{this.loggedIn()}
					<li>
						{/* temporary nav to test listen component */}
						<Link to="/listen">Listen</Link>
					</li>
                </ul>
            </nav>
        )
    }
}