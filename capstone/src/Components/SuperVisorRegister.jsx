import { useState } from 'react';
import '../assets/style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../CONFIG/supabaseClient';

function isValidEmailDomain(email) {
  return email.endsWith('@nu.edu.pk');
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function SuperVisorRegister() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [domain, setDomain] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password || !name || !domain) {
            setError("Fill all fields");
            return;
        }

        if (!isValidEmailDomain(email)) {
            setError("Only email addresses with the domain '@nu.edu.pk' are allowed to register.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one digit.");
            return;
        }
        
        try {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                  data: {
                    type: 'supervisor'
                  }
                }
            });
            if (error) {
                throw error;
            }
            console.log('Supervisor registered successfully:', user);

            const { data, error: insertError } = await supabase
                .from('supervisors')
                .insert([
                    { domain, name, email },
                ]);
            if (insertError) {
                throw insertError;
            }
            console.log('Supervisor inserted successfully:', data);

            navigate('/Login');
        } catch (error) {
            console.error('Error registering supervisor:', error.message);
            setError("Error registering supervisor. Please try again later.");
        }
    };

    return(
        <div>
            <h1>Register SUPERVISOR Page</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email} 
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type={showPassword ? 'text' : 'password'} id="password" value={password} 
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'} Password
                </button>
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
  
export default SuperVisorRegister;
