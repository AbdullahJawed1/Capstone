import React from "react";
import ChatMessages from "./chatMessages";
import ChatInput from "./chatInput";

export default function ChatChat() {
    return(
        <div className="chatChat">
            <div className="chatInfo">
                <span>Display Name ?</span>
            </div>
            <ChatMessages />

            <ChatInput />
        </div>
    )
}