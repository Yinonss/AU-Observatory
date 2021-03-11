import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import React from "react";
import Base from './components/Base.js'
import NewPlan from "./components/NewPlan";

function App() {
  return (
    <div className="App">
        <Router>
            <Base />
            <Route path="/newplan"><NewPlan /></Route>
        </Router>
    </div>
  );
}

export default App;
