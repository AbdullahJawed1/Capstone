import React, { useContext, useState } from "react";
import {
    collection,query,where,
    getDocs,setDoc,doc,
    updateDoc,serverTimestamp,getDoc,} 
    from "firebase/firestore";
import {db} from "../../firebase"
import {AuthContext} from "../Context/AuthContext"

export default function ChatSearch() {

        const [username, setUsername] = useState("");
        const [user, setUser] = useState(null);
        const [err, setErr] = useState(false);

        const {currUser} = useContext(AuthContext);
        console.log(currUser);

        const handleSearch = async () => {
            const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
            );

            try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
            } catch (err) {
            setErr(true);
            }
        };

        const handleKey = (e) => {
            e.code === "Enter" && handleSearch();
        };

        const handleSelect = async () => {
            //check whether the group(chats in firestore) exists, if not create
            const combinedId =
            currUser.uid > user.uid
                ? currUser.uid + user.uid
                : user.uid + currUser.uid;
            try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currUser.uid,
                    displayName: currUser.displayName,
                    photoURL: currUser.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
                });
            }
            } catch (err) {}

            setUser(null);
            setUsername("")
        };
    
    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find a user" 
                onChange={e=>setUsername(e.target.value)} 
                onKeyDown={handleKey}
                value={username}
                />
            </div>
            {err && <span>Error finding user!</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="user display image" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}


