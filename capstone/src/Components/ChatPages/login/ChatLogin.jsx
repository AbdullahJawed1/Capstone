import "./login.css"
import { toast } from "react-toastify";
function ChatLogin(){

    const handleLogin = e =>{
        e.preventDefault();
        toast.success("wow.")
    } 

    return(
        <div className="ChatLogin"> 
            <div className="item">
                <h2>Login to Capstone Chat</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default ChatLogin;