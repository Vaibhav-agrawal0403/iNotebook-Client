import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type)=> {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }
  return (
    <>
      <NoteState>
        <Router>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert}/>
            <div className="container my-4">
              <Routes>
                  <Route exact path="/" element={<Home showAlert={showAlert} />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                  <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              </Routes>
            </div>
        </Router>
      </NoteState>  
    </>
  );
}

export default App;