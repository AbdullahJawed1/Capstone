import "./adduser.css";
import {firebaseDb} from "../../../../../CONFIG/firebase";
import { arrayUnion, collection, doc, getDocs, query, 
    serverTimestamp, setDoc, 
    updateDoc, 
    where } from "firebase/firestore";
import { useState } from "react";
import {useUserStore} from "../../../../../CONFIG/userstoreZustand";



const AddUser = () => {

    const [user,setUser] = useState(null);

    const {currentUser} = useUserStore();

    const handleSearch = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");

        try {
            const userRef = collection(firebaseDb, "users");

            const q = query(userRef, where("email", "==", email));
        
            const querySnapShot = await getDocs(q);

            console.log(q);
            console.log(email);

            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
            }
        } catch (err) {
            console.log(err);
            console.log(err.message)
        };
    };

    const handleAdd = async () =>{
        const chatRef = collection(firebaseDb,"chats");
        const userChatsRef = collection(firebaseDb,"userschats");

        try {

            const newChatRef = doc(chatRef);

            await setDoc(newChatRef,{
                createdAt: serverTimestamp(),
                messages:[]
            });
            
            await updateDoc(doc(userChatsRef, currentUser.id),{
                chats:arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage:"",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatsRef, user.id),{
                chats:arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage:"",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            });

        } catch (err) {
            console.log(err.message)
        }

    };


    return(
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Email" name="email" />
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <span> {user.name}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}
        </div>
    )
}

export default AddUser