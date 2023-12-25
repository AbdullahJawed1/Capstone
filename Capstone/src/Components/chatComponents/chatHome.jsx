import React from "react";
import ChatSideBar from "./chatSidebar";
import ChatChat from "./chatChat";
export default function ChatHome () {
    return(
        <div className="chatHome">
            <div className="container">
                {/* <p>Home</p> */}
                <ChatSideBar />
                <ChatChat />
            </div>
        </div>
    )
}