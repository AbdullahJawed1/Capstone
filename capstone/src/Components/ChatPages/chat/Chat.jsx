import { useEffect, useRef, useState } from "react";
import "./chatchat.css"

function Chat(){
    const [text,setText] = useState("");

    const endRef = useRef(null)

    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"});
    },[]);

    // console.log(text);
    return(
        <div className="chatMain"> 
            <div className="top">
                <div className="user">
                    <img src="src/assets/avatar.png" />
                    <div className="texts">
                        <span> user </span>
                        <p> user description </p>
                    </div>
                </div>
                {/* <div className="icons">

                </div> */}
                <button className="logOut">LogOut</button>
            </div>
            <div className="center">
                <div className="message">
                    <img src="src/assets/avatar.png" />
                    <div className="texts">
                        <p> hello,a message sent</p>
                        <span> 1 min ago </span>
                    </div>
                </div>
                <div className="message">
                    <img src="src/assets/avatar.png" />
                    <div className="texts">
                        <p> hello,a message sent</p>
                        <span> 1 min ago </span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="src/assets/welcome.jpg" />
                        <p> hello,a message sent</p>
                        <span> 1 min ago </span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="src/assets/img.png" />
                </div>
                <input type="text" placeholder="Send a message." 
                onChange={(e) =>setText(e.target.value)}/>
                <button className="sendMessage">send</button>
            </div>
        </div>
    )
}

export default Chat;