import { useState } from 'react';
import '../assets/style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../CONFIG/supabaseClient';

function isValidIdFormat(id) {
  const regex = /^\d{2}[a-zA-Z]-\d{4}$/;
  return regex.test(id);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function StudentRegister() {
    const navigate = useNavigate();
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State variable for toggling password visibility

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!email || !password || !firstname || !lastname || !id) {
          setError("Fill all fields");
          return;
      }
  
      if (!isValidIdFormat(id)) {
          setError("ID format is invalid. Please use the format 'XXx-XXXX', where X is a digit and x is a letter.");
          return;
      }
  
      if (!isValidPassword(password)) {
          setError("Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one digit.");
          return;
      }
  
      // Domain validation
      if (!email.endsWith('@nu.edu.pk')) {
          setError("Only email addresses with the domain '@nu.edu.pk' are allowed to register.");
          return;
      }
      
      try {
          // Sign up user
          const { user, error } = await supabase.auth.signUp({
              email: email,
              password: password,
              options: {
                data: {
                  type: 'student'
                }
              }
          });
          if (error) {
              throw error;
          }
          console.log('User registered successfully:', user);
  
          // Insert student details into database
          const { data: studentData, error: studentError } = await supabase
              .from('student')
              .insert([
                  { 
                      firstname: firstname,
                      lastname: lastname,
                      email: email,
                      nu_id: id
                  }
              ]);        
          if (studentError) {
              throw studentError;
          }
          console.log('Student inserted successfully:', studentData);
  
          // Navigate to login page
          navigate('/Login');
      } catch (error) {
          console.error('Error registering student:', error.message);
          setError("Error registering student. Please try again later.");
      }
  };
  
    return(
        <div>
            <h1>Register Page</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email} 
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
                <input type={showPassword ? 'text' : 'password'} id="password" value={password} 
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="showPassword" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'} Password
                </button >
                <ul>
                    Password must
                    {/* Ab!12345678 */}
                    <li>Contain at least one lowercase letter.</li>
                    <li>Contain at least one uppercase letter</li>
                    <li>Contain at least one digit.</li>
                    <li>Contain at least one special character among @$!%*?&.</li>
                    <li>Have a minimum length of 8 characters.</li>
                </ul>
                <input type="text" id="firstname" value={firstname} 
                placeholder="Enter first name" onChange={(e) => setFirstname(e.target.value)}/>
                <input type="text" id="lastname" value={lastname} 
                placeholder="Enter last name" onChange={(e) => setLastname(e.target.value)}/>
                <input type="text" id="id" value={id} 
                placeholder="Enter ID (e.g., 20k-0461)" onChange={(e) => setId(e.target.value)}/>
                <button type='submit'>Register</button>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <Link to="/Login">Login</Link></p>
            </form>
        </div>
    )
}
  
export default StudentRegister;
