import "./chatlist.css"

function ChatList(){
    return(
        <div className="chatlist"> 
            <div className="search">
                <div className="searchbar">
                    <img src="src\assets\search.png" />
                    <input type="text" placeholder="Search a user" />
                </div>
                <img src="src\assets\plus.png" className="add"/>
            </div>
        </div>
    )
}

export default ChatList;