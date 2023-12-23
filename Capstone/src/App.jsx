import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage/homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage";
import GroupsPage from "./Components/GroupsPage/GroupsPage";
import Profile from "./Components/Profle/Profile";
import SupervisorsPage from "./Components/Supervisors/SupervisorsPage";

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



        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
