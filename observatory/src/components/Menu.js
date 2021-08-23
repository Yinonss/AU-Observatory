import React from "react";
import './../components/Menu.css'
export default function Guide() {



return (
    <div class=",menuContainer">
        <div class='card'>
            <div class = 'content'>
                <h2>New Plan</h2>
                <p>Conduct astronomical research with the AU Observatory plan editor.</p>
                <a href='/newplan'>Click Here</a>
            </div>
        </div>
        <div class='card' id='planlist'>
            <div class = 'content'>
                <h2>Plan List</h2>
                <p>View past observatory missions. </p>
                <a href='/planlist'>Click Here</a>
            </div>
        </div>
        <div class='card'>
            <div class = 'content'>
                <h2>Guide</h2>
                <p>Learn the structure of the system and how to operate it.</p>
                <a href='/guide'>Click Here</a>
            </div>
        </div>
        <div class='card'>
            <div class = 'content'>
                <h2>About Us</h2>
                <p>Learn about the facility, the project, and its purpose.</p>
                <a href='/about'>Click Here</a>
            </div>
        </div>
    </div>
    );
}