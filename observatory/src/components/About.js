import React from "react";
import ACP from './../Images/ACP logo.jpg'
import simbad from './../Images/simbad.png'
import materialui from './../Images/materialui.png'
import reactlogo from './../Images/reactlogo.png'
import mongologo from './../Images/mongodb-logo.png'
import nodejslogo from './../Images/nodejs.png'
import './Style.css'

export default function About() {


return (
    <div class='container'>
        <div class='textContainer'>
       <b>Project</b>
       <p>This application is a final project in Computer Science B.Sc.</p>
       <p>The main porpose of this application is to build a web system for conducting astronomical research for the astronomers in
           the Astrophysics department in Ariel University.
       </p>
       <b>Motivation </b>
       <p>The researchers from the Astrophysics department of our university are using observatory control system which called ACP.
            This program has a local desktop planner with old and complicated design . </p>

        <b>Goal</b>
        <p>
            Our mission was to create an accessible web interface for planning astronomical observations.
            This system will be intuitive, sightly, and comfortable to the astronomers to provide a great user experience.
             This planner will itegrate with ACP control software by producing an ACP script file which operate the facility.
        </p>
        <b>Technologies and Credits:</b>
        <br />
        <br />
        <table>
            <tr>
                <td>
                <img src={ACP} height='140px'></img>
                </td>
                <td>
                    <img src={simbad} width='140px'></img>
                </td>
                <td>
                    <img src={materialui} width='140px'></img>
                </td>
                <td>
                    <img src={reactlogo} width='140px'></img>
                </td>
                <td>
                    <img src={mongologo} width='140px'></img>
                </td>
                <td>
                    <td>
                        <img src={nodejslogo} width='140px'></img>
                    </td>
                </td>
            </tr>
            
        </table>
        </div>
    </div>
    );
}