import { useEffect, useRef, useState } from "react";
import "./chatchat.css"
import { firebaseAuth, firebaseDb } from "../../../CONFIG/firebase";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../../CONFIG/chatstoreZustand";
import { useUserStore } from "../../../CONFIG/userstoreZustand";

function Chat(){
    const [text,setText] = useState("");
    const [chat,setChat] = useState("");

    const {currentUser} = useUserStore();
    const {chatId,user} = useChatStore();

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

    const handleSend = async () =>{
        if (text === "") return

        try {
            await updateDoc(doc(firebaseDb,"chats",chatId),{
                messages:arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date()
                }),
            });

            const userIDs = [currentUser.id,user.id]

            userIDs.forEach(async (id) => {
                const userChatRef = doc(firebaseDb,"userschats",id);
                const userChatSnapshot = await getDoc(userChatRef);

                if(userChatSnapshot.exists()){
                    const userChatsData = userChatSnapshot.data()

                    const chatIndex = userChatsData.chats.findIndex(c=>c.chatId === chatId);
                    
                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = 
                        id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatRef,{
                        chats:userChatsData.chats,
                    })

                }
            });
        } catch (err) {
            console.log("Error sending message: ",err.message);
        }
    }
    
    return(
        <div className="chatMain"> 
            <div className="top">
                <div className="user">
                    <img src="src/assets/avatar.png" />
                    <div className="texts">
                        <span> {user.name} </span>
                        <p> {user.email} </p>
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
                <button className="sendMessage" onClick={handleSend}>
                    send
                </button>
            </div>
        </div>
    )
}

export default Chat;