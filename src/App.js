import React from 'react';
import {BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';
import User from './components/User';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Signin/>} />
            <Route path="/user" element={<User/>} />

          </Routes>
        </Router>
      </>
  );
}

export default App;
