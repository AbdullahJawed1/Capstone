import React, { useContext,useRef,useState,useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const ChatMessage = ({ message }) => {
    const { currUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
  
    const ref = useRef();
  
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
  
    return (
      <div
        ref={ref}
        className={`message ${message.senderId === currUser.uid && "owner"}`}
      >
        <div className="messageInfo">
          <img
            src={
              message.senderId === currUser.uid
                ? currUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    );
  };
  
  export default ChatMessage;