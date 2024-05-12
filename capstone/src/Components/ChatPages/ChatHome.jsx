import "../../assets/chat.css"
import Detail from "./detail/Detail";
import List from "./list/List";
import Chat from "./chat/Chat";
import ChatLogin from "./login/ChatLogin";
import Notification from "../notificationChatithink/Notification";
import { useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../CONFIG/firebase";
import { useUserStore } from "../../CONFIG/userstoreZustand";
import { useChatStore } from "../../CONFIG/chatstoreZustand";

function ChatHome(){

    const {currentUser,isLoading,fetchUserInfo } = useUserStore();
    const {chatId} = useChatStore();

    useEffect(() =>{
        const unSub = onAuthStateChanged(firebaseAuth,(user) =>{
            fetchUserInfo(user?.uid);
        });
        return () =>{
            unSub();
        };
    }, [fetchUserInfo]);

    if(isLoading) return <div className="loading">Loading</div>

    return(
    <div className="container-md">
        {
            currentUser ? (<>
                <List />
                {chatId && <Chat />}
            </>
            ) : (<ChatLogin />)
        }
        <Notification />
    </div>
    )
}

export default ChatHome;