import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../../CONFIG/supabaseClient';

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
    const [interest1, setInterest1] = useState('');
    const [interest2, setInterest2] = useState('');
    const [interest3, setInterest3] = useState('');
    const [interest4, setInterest4] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password || !name || !interest1 || !interest2) {
            setError("Fill all mandatory fields");
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
            console.log('Supervisor registered successfully (supabase):', user);

            const { data, error: insertError } = await supabase
                .from('supervisors')
                .insert([
                    {
                    email: email,
                    name: name, 
                    "Area of Interest 1": interest1,
                    "Area of Interest 2": interest2,
                    "Area of Interest 3": interest3,
                    "Area of Interest 4": interest4 },
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
        <div className='login-container'>
            <h1 className="login-heading" >Register SUPERVISOR Page</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="form-input" type="text" id="email" value={email} 
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                <input className="form-input" type={showPassword ? 'text' : 'password'} id="password" value={password} 
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-button" type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'} Password
                </button>
                <input className="form-input" type="text" id="name" value={name} 
                placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
                <input className="form-input"type="text" id="interest1" value={interest1} 
                placeholder="Enter interest 1" onChange={(e) => setInterest1(e.target.value)}/>
                <input className="form-input" type="text" id="interest2" value={interest2} 
                placeholder="Enter interest 2" onChange={(e) => setInterest2(e.target.value)}/>
                <input className="form-input" type="text" id="interest3" value={interest3} 
                placeholder="Enter interest 3 (Optional)" onChange={(e) => setInterest3(e.target.value)}/>
                <input className="form-input" type="text" id="interest4" value={interest4} 
                placeholder="Enter interest 4 (Optional)" onChange={(e) => setInterest4(e.target.value)}/>
                <button className="login-button" type='submit'>Register</button>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <Link to="/Login">Login</Link></p>
            </form>
        </div>
    )
}
  
export default SuperVisorRegister;
