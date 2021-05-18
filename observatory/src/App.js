import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import React from "react";
import Base from './components/Base.js'
import NewPlan from "./components/NewPlan";
import PlanList from "./components/PlanList";


function App() {
  return (
    <div className="App">
        <Router>
            <Base />
            <Route path="/newplan"><NewPlan /></Route>
            <Route exact path={"/"}>
                <PlanList/>
            </Route>
        </Router>
    </div>
  );
}

export default App;
