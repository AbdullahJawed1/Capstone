// src/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from './CONFIG/supabaseClient';

const ProtectedRoute = ({ element }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    // Optionally, you can render a loading indicator while the session is being fetched
    return <div>Loading...</div>;
  }

  return session ? element : <Navigate to="/Login" />;
};

export default ProtectedRoute;
