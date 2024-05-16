import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Components/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import supabase from './CONFIG/supabaseClient';
import HomePage from './Components/Homepage/homepage';
import ProjectsPage from './Components/ProjectsPage/ProjectsPage';
import GroupsPage from './Components/GroupsPage/GroupsPage';
import Profile from './Components/Profle/Profile';
import SupervisorsPage from './Components/Supervisors/SupervisorsPage';
import Proposal from './Components/Proposal/ProposalPage';
import StudentRegister from './Components/loginRegister/StudentRegister';
import SuperVisorRegister from './Components/loginRegister/SuperVisorRegister';
import Login from './Components/loginRegister/Login';
import SupervisorProfile from './Components/Supervisors/SupervisorProfile';
import SendProposal from './Components/Supervisors/SendProposal';
import SimilarityChecker from './Components/ProjectsPage/similarityChecker';
import AddGroups from './Components/GroupsPage/addGroups';
import Proposals from './Components/Proposal/ProposalPage';
import ChatHome from './Components/ChatPages/ChatHome';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/ProjectsPage" element={<ProtectedRoute element={<ProjectsPage />} />} />
        <Route path="/GroupsPage" element={<ProtectedRoute element={<GroupsPage />} />} />
        <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/SupervisorsPage" element={<ProtectedRoute element={<SupervisorsPage />} />} />
        <Route path="/xyz" element={<SuperVisorRegister />} />
        <Route path="/Register" element={<StudentRegister />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Proposal" element={<ProtectedRoute element={<Proposal />} />} />
        <Route path="/SupervisorsPage/SupervisorProfile/:id" element={<ProtectedRoute element={<SupervisorProfile />} />} />
        <Route path="/SupervisorsPage/SendProposal/:id" element={<ProtectedRoute element={<SendProposal />} />} />
        <Route path="/SimilarityChecker" element={<ProtectedRoute element={<SimilarityChecker />} />} />
        <Route path="/AddGroups" element={<ProtectedRoute element={<AddGroups />} />} />
        <Route path="/Proposals" element={<ProtectedRoute element={<Proposal />} />} />
        <Route path="/ChatHome" element={<ProtectedRoute element={<ChatHome />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
