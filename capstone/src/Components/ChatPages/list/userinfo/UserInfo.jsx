import "./userinfo.css"
import { useUserStore } from "../../../../CONFIG/userstoreZustand";

function UserInfo(){

    const {currentUser } = useUserStore();

    return(
        <div className="userinfo"> 
            <div className="users">
                <h2> {currentUser.name} </h2>
            </div> 
            <div className="icons">
                <img src="src\assets\more.png"/>
                <img src="src\assets\edit.png"/>
            </div>
        </div>
    )
}

export default UserInfo;