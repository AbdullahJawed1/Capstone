import React, { useContext } from "react";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase"
import { AuthContext } from "../Context/AuthContext";

export default function ChatNavBar() {
    const {currUser} = useContext(AuthContext);
    return(
        <div className="chatNavBar">
            <span className="logo">Capstone</span>
            <div className="user">
                <img src={currUser.photoURL} alt="image" />
                <span>{currUser.displayName}</span>
                <button onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}