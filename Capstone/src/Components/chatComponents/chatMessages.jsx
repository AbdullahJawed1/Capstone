import React,{useContext,useState,useEffect} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ChatMessage from "./chatMessage";
import { ChatContext } from "../Context/ChatContext";

export default function ChatMessages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
  
    useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
  
      return () => {
        unSub();
      };
    }, [data.chatId]);
  
    console.log(messages)
  
    return (
      <div className="messages">
        {messages.map((m) => (
          <ChatMessage message={m} key={m.id} />
        ))}
      </div>
    );
};