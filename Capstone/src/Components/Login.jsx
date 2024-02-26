import React,{useState} from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link,useNavigate } from "react-router-dom";
import { auth } from "../firebase.js"

export default function Login() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;


        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch (err) {
            setErr(true);
            console.log(err);
          }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Capstone</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign In</button>
                    {err && <span>Some error occured!</span>}
                </form>
                <p>Don't have an account?<Link style={{textDecoration:"none"}} to="/Register"> Register</Link></p>
            </div>
        </div>
    )
}