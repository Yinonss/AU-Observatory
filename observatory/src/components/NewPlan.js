import React, {useState} from "react";
import Style from './Style.css'
import Editor from "./Editor";
import TargetsBoard from "./TargetsBoard";
import Target from"./Target"
/* This component containing Editor and TargetList components.
*  It is activated after press on "NEW PLAN" button on the main menu.  */


export default function NewPlan() {

    const allTargets = []
    const [targets, setTargets] = useState(allTargets)
    const addTarget = (target)=> {
        setTargets([...targets, target])
    }

    return (
        <div className="container">
            <td><Editor addTarget={addTarget}/></td>
            <td><TargetsBoard allTargets={targets} setTargets={setTargets} /></td>
        </div>
    );
}