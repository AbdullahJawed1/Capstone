import React from "react"

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
                <p>Register</p>
            </div>
        </div>
    )
}