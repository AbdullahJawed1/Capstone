import React,{ useContext}from "react";
import ChatMessages from "./chatMessages";
import ChatInput from "./chatInput";
import { ChatContext } from "../Context/ChatContext";

export default function ChatChat() {

    const {data} = useContext(ChatContext);

    return(
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user.displayName}</span>
            </div>
            <ChatMessages />

            <ChatInput />
        </div>
    )
}