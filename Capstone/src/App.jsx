import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Components/Context/AuthContext";

import "./Components/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./Components/Homepage/homepage";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage";
import GroupsPage from "./Components/GroupsPage/GroupsPage";
import Profile from "./Components/Profle/Profile";
import SupervisorsPage from "./Components/Supervisors/SupervisorsPage";
// import Chat from "./Components/Chat/Chat";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ChatHome from "./Components/chatComponents/chatHome";


function App() {

  const {currUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if(!currUser){
      return <Navigate to="/Login"/>
    }
    return children
  }
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element =  {<ProtectedRoute>
            <HomePage />
          </ProtectedRoute>}>  </Route>
          <Route path="/ProjectsPage" element =  {<ProjectsPage/>}>  </Route>
          <Route path="/GroupsPage" element =  {<GroupsPage/>}>  </Route>
          <Route path="/Profile" element =  {<Profile/>}>  </Route>
          <Route path="/SupervisorsPage" element =  {<SupervisorsPage/>}>  </Route>
          {/* <Route path="/Chat" element =  {<ChatHome/>}>  </Route> */}
          <Route path="/Register" element =  {<Register/>}>  </Route>
          <Route path="/Login" element =  {<Login/>}>  </Route>

          <Route path="/Chat" element =  {<ChatHome/>}>  </Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
