import React from "react";
import ChatNavBar from "./chatNavbar";
import ChatSearch from "./chatSearch";
import ChatChats from "./chatChats";

export default function ChatSideBar() {
    return(
        <div className="sidebar">
            <ChatNavBar />
            <ChatSearch />
            <ChatChats />
        </div>
    )
}