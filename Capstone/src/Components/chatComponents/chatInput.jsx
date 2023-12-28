import React from "react";

export default function ChatInput() {
    return(
        <div className="chatInput">
            <input type="text" placeholder="Send a message." />
            <div className="sendMessage">
                <img src="" alt=""/>
                <input type="file" style={{display:"none"}} id="attachFile" />
                    <label htmlFor="attachFile" >
                        <img src="src\assets\attach.png" />
                    </label>
                <button>Send</button>
            </div>
        </div>
    )
}