import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage";
import GroupsPage from "./Components/GroupsPage/GroupsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/HomePage" element =  {<HomePage />}>  </Route>
          <Route path="/ProjectsPage" element =  {<ProjectsPage/>}>  </Route>
          <Route path="/GroupsPage" element =  {<GroupsPage/>}>  </Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
