import { useState } from "react";
import "./chatlist.css"
import AddUser from "./adduser/AddUser";

function ChatList(){
    const [addMode,setAddMode] = useState(false)



    return(
        <div className="chatlist"> 
            <div className="search">
                <div className="searchbar">
                    <img src="src\assets\search.png" />
                    <input type="text" placeholder="Search a user" />
                </div>
                <img src={addMode ? "src/assets/minus.png" : "src/assets/plus.png"}
                className="add" onClick={()=>setAddMode((prev)=>!prev)}/>
            </div>
            <div className="item">
                <img src="src/assets/avatar.png" />
                <div className="texts">
                    <span> user </span>
                    <p> latest msg. </p>
                </div>
            </div>
            <div className="item">
                <img src="src/assets/avatar.png" />
                <div className="texts">
                    <span> user </span>
                    <p> latest msg. </p>
                </div>
            </div>
            <div className="item">
                <img src="src/assets/avatar.png" />
                <div className="texts">
                    <span> user </span>
                    <p> latest msg. </p>
                </div>
            </div>
            <div className="item">
                <img src="src/assets/avatar.png" />
                <div className="texts">
                    <span> user </span>
                    <p> latest msg. </p>
                </div>
            </div>
            {addMode && <AddUser /> }
        </div>
    )
}

export default ChatList;