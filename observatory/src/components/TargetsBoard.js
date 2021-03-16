import React from "react";
import Style from './Style.css'

/* This component define the plan's structure and display its targets. */

export default function TargetInfo() {

    return (
        <div class="TargetInfo">
            <table>
                <tr>
                    <td>Plan Name:</td>
                    <td><input type="text"></input></td>
                </tr>
            </table>
            <div class="list">
            </div>
            <br />
            <button id="submit">Submit</button>
        </div>
    );
}