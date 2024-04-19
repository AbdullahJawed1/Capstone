import './App.css'
import supabase from '../config/supabase'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  console.log(supabase)
  return(
    <Router>
      <Routes>

      <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register/>}/>
        
      </Routes>
    </Router>
    // <div>
    //   <h2>Capstone</h2>
    // </div>
  )    
}

export default App
