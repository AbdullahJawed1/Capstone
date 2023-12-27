import React from "react"
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Capstone</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign In</button>
                </form>
                <p>Don't have an account?<Link style={{textDecoration:"none"}} to="/Register"> Register</Link></p>
            </div>
        </div>
    )
}