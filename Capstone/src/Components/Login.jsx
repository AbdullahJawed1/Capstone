import React,{useState} from "react"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link,useNavigate } from "react-router-dom";
import { auth} from "../firebase.js"

export default function Login() {

    const history = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                history('/'); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
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
                </form>
                <p>Don't have an account?<Link style={{textDecoration:"none"}} to="/Register"> Register</Link></p>
            </div>
        </div>
    )
}