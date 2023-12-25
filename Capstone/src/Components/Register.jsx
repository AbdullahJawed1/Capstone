import React from "react"

export default function Register() {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Capstone</span>
                <span className="title">Register</span>
                <form>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={{display:"none"}}type="file" id="imagefile"/>
                        <label htmlFor="imagefile">
                            <img src="src\assets\addAvatar.png" alt="" />
                            <span>Add an image</span>
                        </label>
                    <button>Sign Up</button>
                </form>
                <p>Sign in</p>
            </div>
        </div>
    )
}