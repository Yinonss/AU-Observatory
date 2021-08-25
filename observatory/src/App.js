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
import Headline from './components/Headline';

function App() {
  return (
    <div className="App">
        <Router>
            
            <Route exact path="/">
              <Headline />
                <Menu />
            </Route>
            <Route path="/newplan"><Base /><NewPlan /></Route>
            <Route path={"/planlist"}>
                <Base />
                <PlanList/>
            </Route>
            <Route path='/guide'><Base /><Guide /></Route>
            <Route path='/about'><Base /><About /></Route>
        </Router>
    </div>
  );
}

export default App;
