
import React, {useState} from "react";

/* This component containing Editor and TargetList components.
*  It is activated after press on "NEW PLAN" button on the main menu.  */

export default function Guide() {



return (
    <div className='Guide'>
        <p>
            In order to conduct an astronamical research with AU Observatory Planner you will have to be familiar with  the 
            structure of a plan and the creation flow.
        </p>
    <b>Structure:</b>
    <p>
        An astronomical plan is built out of at least one target. Targets can be made in the editor which locate in the
        left side of the NEW PLAN page. There, You will be able to insert different targets to the plan and they will be
        displayed in the right side of the page by order of insertion.
    </p>
    <p>
        Each plan have to have a set of requiered parameters which are:
        Target's name, celestial coordinates, start and end date , and imaging sessions.
        Imaging session is the basic photographic operation the will be performed on the target. It is a combination of
        4 element: Filter, number of exposures, duration of one exposure and binning (which determine the resolution of
        the images). Target will not be leagal if it lacks one of the requierd fields.
        In addition, we have provided more advanced setting options at the buttom of the page - these settings are not 
        requierd.
    </p>
    <p>
        Another kinds of targets are bias and dark frames. These are not real target but being treated similarly.
        Basicly they are dummy frame shots which thier purpose is to reset the photons to reduce image noise and
        potentioaly to prevent burning the camera components.
        Targets are being connected under one plan and will be complie by the observation control system as one plan.
    </p> 
    <b>Flow:</b>    
    <br/>   
    <br/>
    <list>
        <li>Navigate to 'NEW PLAN'.</li>
        <li>Enter a target name - click on the search button to get the right assention and declenation.</li>
        <li>Set starting and ending dats for the plan.</li>
        <li>Set at least one imaging session.</li>
        <li>Optional: add an advanced setting to the plan.</li>
        <li>Click on 'Add' and notice that the target has been added to the plan list.</li>
        <li>Repeat this process (from step 1 to 6) for every target that is nessesary for the research.</li>
        <li>Optional: add a bias or dark frame to reset photons for reducing image noise.</li>
        <li>Optional: add advanced setting to the whole plan.</li>
        <li>Click submit.</li>
    </list>
</div>
    );
}