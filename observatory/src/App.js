import logo from './logo.svg';
import './App.css';
import React from "react";
import Base from './components/Base.js'
import Editor from "./components/Editor";
import NewPlan from "./components/NewPlan";

function App() {
  return (
    <div className="App">
        <Base />
        <NewPlan />
    </div>
  );
}

export default App;
