import React from 'react'
import {NavLink} from "react-router-dom";
import Menu from './../Styles/Menu.css'

export default function NavMenu(){
    return (
        <div className='main-menu'>
            <header>
                <nav className="navmenu">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/newplan'>New Plan</NavLink></li>
                    <li><NavLink to='/planlist'>Dashboard</NavLink></li>
                    <li><NavLink to='/guide'>Guide</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                </nav>
            </header>
        </div>
    );
}