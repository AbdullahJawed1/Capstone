import "./login.css"
import { toast } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth,firebaseDb,firebaseStorage } from "../../../CONFIG/firebase";
import { doc, setDoc } from "firebase/firestore"; 

import { useState } from "react";
function ChatLogin(){

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) =>{
        e.preventDefault();

        try {
            const res = await signInWithEmailAndPassword(firebaseAuth,email,password);
            console.log(res.user.uid);
            toast.success("Logged into capstone chat.")
        } catch (error) {
            console.error('Error signing in:', error.message);
            toast.error(error.message);
        }
    } 

    return(
        <div className="ChatLogin"> 
            <div className="item">
                <h2>Login to Capstone Chat</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"  onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" name="password"  onChange={(e) => setPassword(e.target.value)}/>
                    <button>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default ChatLogin;