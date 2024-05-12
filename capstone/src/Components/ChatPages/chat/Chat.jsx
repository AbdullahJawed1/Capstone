import { useEffect, useRef, useState } from "react";
import "./chatchat.css"
import { firebaseAuth, firebaseDb } from "../../../CONFIG/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useChatStore } from "../../../CONFIG/chatstoreZustand";

function Chat(){
    const [text,setText] = useState("");
    const [chat,setChat] = useState("");

    const {chatId} = useChatStore();

    const endRef = useRef(null)

    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"});
    },[]);

    useEffect(() =>{
        const unSub = onSnapshot(doc(firebaseDb,"chats",chatId)
        ,(res) =>{
            setChat(res.data())
        })

        return () =>{
            unSub();
        }
    },[chatId]);

    
    return(
        <div className="chatMain"> 
            <div className="top">
                <div className="user">
                    <img src="src/assets/avatar.png" />
                    <div className="texts">
                        <span> user </span>
                        <p> user description </p>
                    </div>
                </div>
                <button className="logOut" onClick={()=>firebaseAuth.signOut()}>
                    LogOut
                </button>
            </div>
            <div className="center">
                { chat?.messages?.map((message) =>(
                <div className="message own" key={message?.createdAt}>
                    <div className="texts">
                        <p>{message.text}</p>
                        {/* <span>{message} </span> */}
                    </div>
                </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="src/assets/img.png" />
                </div>
                <input type="text" placeholder="Send a message." 
                onChange={(e) =>setText(e.target.value)}/>
                <button className="sendMessage">send</button>
            </div>
        </div>
    )
}

export default Chat;