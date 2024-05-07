import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../CONFIG/supabaseClient';
import Proposalcard from '../Components/Proposal/ProposalCard';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState(null); // Add state to store userId

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Fill all fields");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                throw error;
            }
            console.log('User signed in successfully:', data);
            const userType = data.user.user_metadata.type;
            console.log('User signed in as:', userType);

            // Save user type to state
            setUserType(userType);
            // Search the appropriate table based on user type
            let tableName = userType === 'student' ? 'student' : 'supervisors';
            let selectFields = userType === 'student' ? 'id, firstname, lastname' : 'id, name';
            const { data: userData, error: userError } = await supabase
                .from(tableName)
                .select(selectFields)
                .eq('email', email)
                .single();
            
            

            if (userError) {
                throw userError;
            }

            if (userData) {
                console.log('User found:', userData);
                setUserId(userData.id); // Store userId in state
            } else {
                console.log('User not found.');
            }

            // Navigate to home or dashboard based on user type
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error.message);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <input type="text" id="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
                {error && <div className="error-message">{error}</div>}
                <p>Don't have an account? <Link to="/Register">Register</Link></p>
            </form>

            {userId && <Proposalcard userId={userId} />} {/* Render Proposalcard only if userId is available */}
        </div>
    );
}

export default Login;
