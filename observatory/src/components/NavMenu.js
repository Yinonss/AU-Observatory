import React from 'react'
import {NavLink} from "react-router-dom";
import Menu from './../Styles/Menu.css'


export default function NavMenu(){
    return (
        <header>
            <div className='main-menu'>
                    <nav className="navmenu">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/newplan'>New Plan</NavLink></li>
                        <li><NavLink to='/planlist'>Plan List</NavLink></li>
                        <li><NavLink to='/guide'>Guide</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                    </nav>
            </div>
        </header>
    );
}