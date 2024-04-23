import '../assets/style.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!email||!password){
            setError("Fill all fields")
            return 
        }

        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            setError(true)
            console.log(error)
        }
        if(data){
            setError(null)
            console.log(data)
            navigate('/')
        }
  
    }
    return(
        <div>
            <h1>Login Page</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email}
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" value={password} 
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
                {error && <div className="error-message">{error}</div>}
                <p>Don't have an account? <Link to="/Register">Register</Link></p>
            </form>
        </div>
    )
}
  
export default Login
  