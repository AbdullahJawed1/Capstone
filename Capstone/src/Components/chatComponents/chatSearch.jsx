import React from "react";

export default function ChatSearch() {
    return(
        <div className="chatSearch">
            <div className="chatSearchForm">
                <input type="text" placeholder="Find a user"></input>
            </div>
            <div className="userChat">
                <img src="src\assets\add.png" alt="user display image" />
                <div className="userChatInfo">
                    <span>Display Name</span>
                </div>
            </div>
        </div>
    )
}


