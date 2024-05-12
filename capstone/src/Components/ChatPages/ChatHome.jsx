import "../../assets/chat.css"
import Detail from "./detail/Detail";
import List from "./list/List";
import Chat from "./chat/Chat";
import ChatLogin from "./login/ChatLogin";
import Notification from "../notificationChatithink/Notification";
import { useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../CONFIG/firebase";

function ChatHome(){

    const user = false;

    useEffect(() =>{
        const unSub = onAuthStateChanged(firebaseAuth,(user) =>{
            console.log(user)
        });
        return () =>{
            unSub();
        };
    }, []);

    return(
    <div className="container-md">
        {
            user ? (<>
                {/* <p>chat home</p> */}
                <List />
                <Chat />
                {/* <Detail /> */}
            </>
            ) : (<ChatLogin />)
        }
        <Notification />
    </div>
    )
}

export default ChatHome;