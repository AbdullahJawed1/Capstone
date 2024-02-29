import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../../firebase";



export default function ChatChats() {

    const [chats,setChats] = useState([]);

    const {currUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);
    
    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
    
        currUser.uid && getChats();
      }, [currUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };
    console.log(Object.entries(chats));


    return(
        <div className="chatChats">
            {Object.entries(chats)?.map((chat) => (
            <div className="userChat" 
                key = {chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
            >
                <img src={chat[1].userInfo.photoURL} alt="user display image" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].userInfo.lastmessage?.text}</p>
                </div>
            </div>
            ))}
        </div>
    )
}