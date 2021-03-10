import React from "react";
import Style from './Style.css'

/* This function returns the upper page which includes title and menu. */

export  default  function Base() {
    return (
        <div className="UpperPage">
            <table>
                <tr>
                    <td>
                        <h2>Ariel University</h2>
                        <h1>Observatory</h1>
                    </td>
                    <td>
                        <ul>
                            <li><a href="#home">home</a></li>
                            <li><a href="#newplan">new plan</a> </li>
                            <li><a href="#settings">settings</a> </li>
                            <li><a href="#about">about</a> </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    );
}