import React from "react";

export default function ChatMessage() {
    return(
        <div className="chatMessage">
            <div className="messageInfo">
                <img src="src\assets\add.png" alt="" />
                <span>timeOfMessage</span>
            </div>
            <div className="messageContent">
                <p>message content.</p>
                <img />
            </div>
        </div>
    )
}