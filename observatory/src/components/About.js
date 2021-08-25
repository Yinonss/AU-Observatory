import React from "react";
import './Style.css'

export default function About() {


return (
    <div class='container'>
        <div class='textContainer'>
       <b>Project</b>
       <p>This application is a final project in Computer Science B.Sc.</p>
       <p>The main porpose of this to build a web system for conducting astronomical research for the astronomers in
           the Astrophysics department in Ariel University.
       </p>
       <b>Motivation </b>
       <p>The researchers from the Astrophysics department in our university are using observatory control system which called ACP.
            This program has a local desktop planner with old and complicated design . </p>

        <b>Goal</b>
        <p>
            Our mission was to create an accessible web interface which will be much more intuitive, comely and comfortable in order to provide a great user experince.
             This planner will produce an ACP script file which operate the facility.
        </p>
        </div>
    </div>
    );
}