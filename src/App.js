import React from 'react';
import {BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom";
import Home from './Pages/Home';
import Signin from './Pages/Signin';

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Signin/>} />

          </Routes>
        </Router>
      </>
  );
}

export default App;
