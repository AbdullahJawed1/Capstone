import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./Components/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import supabase from "./CONFIG/supabaseClient";
import HomePage from "./Components/Homepage/homepage";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage";
import GroupsPage from "./Components/GroupsPage/GroupsPage";
import Profile from "./Components/Profle/Profile";
import SupervisorsPage from "./Components/Supervisors/SupervisorsPage";
import Chat from "./Components/Chat/Chat";
import Proposal from "./Components/Proposal/ProposalPage";
import StudentRegister from "./Components/StudentRegister";
import SuperVisorRegister from "./Components/SuperVisorRegister";
import Login from "./Components/Login";
import ChatHome from "./Components/chatComponents/chatHome";
import SupervisorProfile from "./Components/Supervisors/SupervisorProfile"
import SendProposal from "./Components/Supervisors/SendProposal"
import SimilarityChecker from "./Components/ProjectsPage/similarityChecker"
import addGroups from "./Components/GroupsPage/Groups"
import Proposals from "./Components/Proposal/ProposalPage"


function App() {

  
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element =  {<HomePage />}>  </Route>
          <Route path="/ProjectsPage" element =  {<ProjectsPage/>}>  </Route>
          <Route path="/GroupsPage" element =  {<GroupsPage/>}>  </Route>
          <Route path="/Profile" element =  {<Profile/>}>  </Route>
          <Route path="/SupervisorsPage" element =  {<SupervisorsPage/>}>  </Route>
          <Route path="/Chat" element =  {<ChatHome/>}>  </Route>
          <Route path="/xyz" element =  {<SuperVisorRegister/>}>  </Route>
          <Route path="/Register" element =  {<StudentRegister/>}>  </Route>
          <Route path="/Login" element =  {<Login/>}>  </Route>
          <Route path="/Proposal" element =  {<Proposal/>}>  </Route>
          {/* <Route path="/Chat" element =  {<ChatHome/>}>  </Route> */}
          {/* <Route path="/SupervisorsPage/SupervisorProfile" element =  {<SupervisorProfile/>}>  </Route> */}
          <Route path="/SupervisorsPage/SupervisorProfile/:id" element={<SupervisorProfile />} />
          <Route path="/SupervisorsPage/SendProposal/:id" element =  {<SendProposal/>}>  </Route>
          <Route path="/SimilarityChecker" element =  {<SimilarityChecker/>}>  </Route>
          <Route path="/addGroups" element =  {<addGroups/>}>  </Route>
          <Route path="/Proposals" element =  {<Proposal/>}>  </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
