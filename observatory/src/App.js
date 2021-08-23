import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import React from "react";
import Base from './components/Base.js'
import NewPlan from "./components/NewPlan";
import PlanList from "./components/PlanList";
import Guide from './components/Guide';
import Menu from './components/Menu';
import Weather from './components/Weather';
import About from './components/About';

function App() {
  return (
    <div className="App">
        <Router>
            <Base />
            <Route exact path="/">
                <Menu />
            </Route>
            <Route path="/newplan"><NewPlan /></Route>
            <Route path={"/planlist"}>
                <PlanList/>
            </Route>
            <Route path='/guide'><Guide /></Route>
            <Route path='/about'><About /></Route>
        </Router>
    </div>
  );
}

export default App;
