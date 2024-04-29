import { useState } from 'react';
import '../assets/style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../CONFIG/supabaseClient';

function Register() {
    const navigate = useNavigate();
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!email||!password||!firstname||!lastname){
            setError("Fill all fields")
            return 
        }
        
        // console.log(email,password,firstname,lastname);

            try {
              const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                data:{ 
                  username: 'John',
                  role: 'student'
                }
              })        
              if (error) {
                throw error;
              }
              console.log('User registered successfully:', data);
              try {
                const { data, error } = await supabase
                  .from('student')
                  .insert([
                    { email,firstname,lastname }
                  ]);        
                if (error) {
                  throw error;
                }
                console.log('Student inserted successfully:', data);
                navigate('/Login');
              } catch (error) {
                console.error('Error inserting student:', error.message);
              }
              navigate('/Login');
            } catch (error) {
              console.error('Error registering student:', error.message);
            }
      };

    return(
        <div>
            <h1>Register Page</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email} 
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" value={password} 
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" id="firstname" value={firstname} 
                placeholder="Enter first name" onChange={(e) => setFirstname(e.target.value)}/>
                <input type="text" id="lastname" value={lastname} 
                placeholder="Enter last name" onChange={(e) => setLastname(e.target.value)}/>
                <button type='submit'>Register</button>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <Link to="/Login">Login</Link></p>
            </form>
        </div>
    )
}
  
export default Register  