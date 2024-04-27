import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar';
import supabase from '../../CONFIG/supabaseClient';

export const Profile = () => {
  return (
    <div>
        
        <NavBar />

        <div class="jumbotron">
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
