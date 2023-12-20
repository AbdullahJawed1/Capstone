import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Components/Homepage/homepage"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectsPage from "./ProjectsPage"
import NavBar from "./NavBar";
import Projects from "./Components/Projects/Projects"


function App() {

  return (
    <>

    <HomePage/>
    <Projects/>


    
    </>
  )
}

export default App
