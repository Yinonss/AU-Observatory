import React from "react";
import Style from './Style.css'
import Target from "./Target"
/* This component define the plan's structure and display its targets. */

export default function TargetsBoard(props) {

    return (
        <div class="TargetInfo">
            <table>
                <tr>
                    <td>Plan Name:</td>
                    <td><input type="text"></input></td>
                </tr>
            </table>
            <div class="list">
                {
                    props.allTargets.map(item => <Target name={item.name}/>)
                }
            </div>
            <br />
            <button id="submit">Submit</button>
        </div>
    );
}