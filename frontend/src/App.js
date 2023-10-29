import logo from './logo.svg';
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css';

import Welcome from "./pages/welcome"
import Login from './pages/login';
import Token from './pages/token'

function App() {
  const search = new URLSearchParams(window.location.search)
  const code = search.get("code");
  return (
    <div> 
      <Welcome /> 
      <Router>
      {code ? code : "birthday"}
        <ul>
          <li><a href = "/spotify">Login/Token</a></li>
        </ul>
        <Routes>
          <Route path = "/spotify" element = {code ? <Token code = {code}/> :<Login/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
