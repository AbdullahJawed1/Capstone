import { useState } from 'react';
import '../assets/style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../CONFIG/supabaseClient';

function SuperVisorRegister() {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [domain,setDomain] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!email||!password||!name||!domain){
            setError("Fill all fields")
            return 
        }
        
        // console.log(email,password,firstname,lastname);

            try {
                const { data, error } = await supabase.auth.signUp(
                  {
                    email: email,
                    password: password,
                    options: {
                      data: {
                        type: 'supervisor'
                      }
                    }
                  }
                )        
              if (error) {
                throw error;
              }
              console.log('Supervisor registered successfully:', data);
              try {
                const { data, error } = await supabase
                .from('supervisors')
                .insert([
                    {domain, name,email},
                ])
                .select()     
                // const { data, error } = await supabase
                //   .from('supervisors')
                //   .insert([
                //     { name,domain,email }
                //   ]);        
                if (error) {
                  throw error;
                }
                console.log('Supervisor inserted successfully:', data);
                navigate('/Login');
              } catch (error) {
                console.error('Error inserting supervisor:', error.message);
              }
              navigate('/Login');
            } catch (error) {
              console.error('Error registering supervisor:', error.message);
            }
      };

    return(
        <div>
            <h1>Register SUPERVISOR Page</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email} 
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" value={password} 
                placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" id="name" value={name} 
                placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                <input type="text" id="domain" value={domain} 
                placeholder="Enter domain" onChange={(e) => setDomain(e.target.value)}/>
                <button type='submit'>Register</button>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <Link to="/Login">Login</Link></p>
            </form>
        </div>
    )
}
  
export default SuperVisorRegister 