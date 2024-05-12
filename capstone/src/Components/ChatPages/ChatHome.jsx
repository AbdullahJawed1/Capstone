import "../../assets/chat.css"
import Detail from "./detail/Detail";
import List from "./list/List";
import Chat from "./chat/Chat";
import ChatLogin from "./login/ChatLogin";
import Notification from "../notificationChatithink/Notification";

function ChatHome(){

    const user = true;

    return(
    <div className="container-md">
        {
            user ? (<>
                {/* <p>chat home</p> */}
                <List />
                <Chat />
                {/* <Detail /> */}
            </>
            ) : (<ChatLogin />)
        }
        <Notification />
    </div>
    )
}

export default ChatHome;