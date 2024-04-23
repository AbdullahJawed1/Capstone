import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar';
import supabase from '../../CONFIG/supabaseClient';

export const Profile = () => {
  const [username,setUsername] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            throw error;
          }
          if (session) {
            const email = session.user.email;
            const { data, error } = await supabase
              .from('student')
              .select()
              .eq('email', email)
              .single();
            if (error) {
              throw error;
            }
            if (data) {
              setUsername(data.firstname+' '+data.lastname);
            }
          } else {
            setUsername(null);
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      fetchData();
  
      // Subscribe to authentication state changes
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          fetchData();
        } else {
          setUsername(null);
        }
      });
  
      return () => {
        authListener.unsubscribe(); // Unsubscribe from auth state changes when component unmounts
      };
  }, []);
  
  return (
    <div>
        
        <NavBar />

        <div class="jumbotron">
        <h1 class="display-4">{username}</h1>
        <p class="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr class="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <a class="btn btn-primary btn-lg" href="#" role="button">
          Learn more
        </a>
      </div>



    </div>
  );
};

export default Profile;
