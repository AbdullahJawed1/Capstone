import "./userinfo.css"

function UserInfo(){
    return(
        <div className="userinfo"> 
            {/* user info */}
            <div className="users">
                <h2> userName </h2>
            </div> 
            <div className="icons">
                <img src="src\assets\more.png"/>
                <img src="src\assets\edit.png"/>
            </div>
        </div>
    )
}

export default UserInfo;