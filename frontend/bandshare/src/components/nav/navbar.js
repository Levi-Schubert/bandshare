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
                        <Link to="/song">Song</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}