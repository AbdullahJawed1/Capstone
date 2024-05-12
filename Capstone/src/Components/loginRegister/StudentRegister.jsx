import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import supabase from '../../CONFIG/supabaseClient';

import { toast } from 'react-toastify';

import {createUserWithEmailAndPassword} from "firebase/auth";
import { firebaseAuth,firebaseDb,firebaseStorage } from "../../CONFIG/firebase";
import { doc, setDoc } from "firebase/firestore"; 

// import "../../assets/style.css"

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
    const [interest1, setInterest1] = useState('');
    const [interest2, setInterest2] = useState('');
    const [interest3, setInterest3] = useState('');
    const [interest4, setInterest4] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State variable for toggling password visibility

    // this sets variable to true IF an error in either firebase or supabase auth or db entries
    // and will not allow navigate to Login
    const[anyError,setAnyError] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      //firebase for chat:
    //   const formData = new FormData(e.target);

    //   const {firebaseName,firebaseEmail,firebasePassword} = Object.fromEntries(formData);

    //   console.log(firebaseName);



      if (!email || !password || !firstname || !lastname || !id || !interest1 || !interest2) {
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
      
      const fullName = firstname + ' ' + lastname;

      // FIREBASE
      try {
        console.log(email,password)
        const res = await createUserWithEmailAndPassword(firebaseAuth,email,password);
        console.log('User registered successfully (firebase):', res);

        await setDoc(doc(firebaseDb, "users", res.user.uid), {
            id : res.user.uid,
            name: fullName,
            email: email
          });

          await setDoc(doc(firebaseDb, "userschats", res.user.uid), {
            chats:[],
          });

      } catch (err) {
        setAnyError(true);
        console.error('Error registering student (firebase):', err.message);
        setError("Error registering student. Please try again later.");
        toast.error('Error registering student (firebase):')
      }

      // SUPABASE
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
            setAnyError(true);
            toast.error('Error registering student (supabase):', error.message)
            throw error;
          }
          console.log('User registered successfully (supabase):', user);
  
          // Insert student details into database
          const { data: studentData, error: studentError } = await supabase
              .from('student')
              .insert([
                  { 
                      firstname: firstname,
                      lastname: lastname,
                      email: email,
                      nu_id: id,
                      "Area of Interest 1": interest1,
                      "Area of Interest 2": interest2,
                      "Area of Interest 3": interest3,
                      "Area of Interest 4": interest4,
                      name: firstname + ' ' + lastname
                  }
              ]);        
          if (studentError) {
            setAnyError(true);
            throw studentError;
          }
          console.log('Student inserted successfully (supabase):', studentData);
      } catch (error) {
            setAnyError(true);
          console.error('Error registering student (supabase):', error.message);
          setError("Error registering student. Please try again later.");
          toast.error('Error registering student (supabase):', error.message)
      }

      if(!anyError){
        navigate('/Login');
      }
  };
  
    return(
        <div className="login-container">
            <h1 className="login-heading">Register Page</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email} 
                placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} className="form-input"/>
                <input type={showPassword ? 'text' : 'password'} id="password" value={password} 
                placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} className="form-input"/>
                <button className="login-button" type="button" onClick={() => setShowPassword(!showPassword)}>
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
                <input className="form-input" type="text" id="firstname" value={firstname} 
                placeholder="Enter first name" onChange={(e) => setFirstname(e.target.value)}/>
                <input className="form-input" type="text" id="lastname" value={lastname} 
                placeholder="Enter last name" onChange={(e) => setLastname(e.target.value)}/>
                <input className="form-input" type="text" id="id" value={id} 
                placeholder="Enter ID (e.g., 20k-0461)" onChange={(e) => setId(e.target.value)}/>
                <input className="form-input" type="text" id="interest1" value={interest1} 
                placeholder="Enter Area of Interest 1" onChange={(e) => setInterest1(e.target.value)}/>
                <input className="form-input" type="text" id="interest2" value={interest2} 
                placeholder="Enter Area of Interest 2" onChange={(e) => setInterest2(e.target.value)}/>
                <input className="form-input" type="text" id="interest3" value={interest3} 
                placeholder="Enter Area of Interest 3 (optional)" onChange={(e) => setInterest3(e.target.value)}/>
                <input className="form-input" type="text" id="interest4" value={interest4} 
                placeholder="Enter Area of Interest 4 (optional)" onChange={(e) => setInterest4(e.target.value)}/>
                <button className="login-button" type='submit'>Register</button>
                {error && <div className="error-message">{error}</div>}
                <p>Already have an account? <Link to="/Login">Login</Link></p>
            </form>
        </div>
    )
}
  
export default StudentRegister;
