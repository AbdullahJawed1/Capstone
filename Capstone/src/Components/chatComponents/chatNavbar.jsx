import React from "react";

export default function ChatNavBar() {
    return(
        <div className="chatNavBar">
            <span className="logo">Capstone</span>
            <div className="user">
                <img src="src\assets\add.png" alt="image" />
                <span>My Name</span>
                <button >logout</button>
            </div>
        </div>
    )
}