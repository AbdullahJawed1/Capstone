import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage/homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage";
import NavBar from "./Components/NavBar/NavBar";
import Projects from "./Components/ProjectsPage/Projects";

function App() {
  return (
    <>
      {/* <BrowserRouter>
           <Routes> */}
      <HomePage />

      {/* </Routes>
          </BrowserRouter>
     */}
    </>
  );
}

export default App;
