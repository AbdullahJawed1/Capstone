import "../../assets/chat.css"
import Detail from "./detail/Detail";
import List from "./list/List";
import Chat from "./chat/Chat";

function ChatHome(){
    return(
    <div className="container-md">
        {/* <p>chat home</p> */}
        <List />
        <Chat />
        {/* <Detail /> */}
    </div>
    )
}

export default ChatHome;