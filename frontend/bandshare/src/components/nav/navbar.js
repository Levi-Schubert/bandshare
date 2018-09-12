import React, { Component } from "react"
import { Link } from "react-router-dom"


export default class Navbar extends Component {




    render() {
        return (
            <nav >
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
					<li>
						{/* temporary nav to test listen component */}
						<Link to="/listen">Listen</Link>
					</li>
                </ul>
            </nav>
        )
    }
}