import React from "react";
import Style from './Style.css'
import Editor from "./Editor";
import TargetList from "./TargetList";

/* This component containing Editor and TargetList components.
*  It is activated after press on "NEW PLAN" button on the main menu.  */

//TODO: Add targets to list ability

export default function () {
    return (
        <div className="container">
            <td><Editor /></td>
            <td><TargetList /></td>
        </div>
    );
}